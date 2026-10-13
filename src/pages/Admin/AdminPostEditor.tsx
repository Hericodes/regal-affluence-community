import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, ReactNode } from "react";
import {
  Link,
  useBlocker,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

import {
  createPost,
  deletePost,
  getAdminPost,
  isSlugAvailable,
  setPostStatus,
  StaleWriteError,
  updatePost,
  uploadNewsImage,
  validateImageFile,
} from "../../api/newsAdminApi";
import type {
  AdminPost,
  PostInput,
  PostStatus,
} from "../../news/types";
import useNow from "../../hooks/useNow";
import useCategories from "../../news/useCategories";
import {
  formatDate,
  formatDateTime,
  fromLocalInputValue,
  getDisplayStatus,
  LIMITS,
  readingMinutes,
  slugify,
  SLUG_PATTERN,
  toFriendlyError,
  toLocalInputValue,
  validatePost,
  type PostFieldErrors,
} from "../../news/utils";
import ArticleContent from "../News/ArticleContent";
import CoverImage from "../News/CoverImage";
import { CategoryTag, MetaRow } from "../News/News.styles";
import {
  Alert,
  Button,
  CharCount,
  Checkbox,
  Field,
  FieldError,
  Hint,
  Input,
  Label,
  LabelRow,
  Page,
  PageTitle,
  Panel,
  PanelBody,
  PanelHeader,
  Select,
  Textarea,
} from "./Admin.styles";
import ConfirmDialog from "./ConfirmDialog";
import { useNewsroom } from "./newsroomContext";
import RichTextEditor from "./RichTextEditor";
import StatusBadge from "./StatusBadge";

/* =========================================================
   NEWSROOM — POST EDITOR
   Success is only reported after the database confirms the
   change and returns the saved row.
========================================================= */

const EMPTY_POST: PostInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: null,
  cover_image_alt: "",
  category_slug: null,
  author_name: null,
  status: "draft",
  is_featured: false,
  published_at: null,
  seo_title: null,
  seo_description: null,
};

const NEWS_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/news`;

const toInput = (post: AdminPost): PostInput => ({
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content,
  cover_image_url: post.cover_image_url,
  cover_image_alt: post.cover_image_alt,
  category_slug: post.category_slug,
  author_name: post.author_name,
  status: post.status,
  is_featured: post.is_featured,
  published_at: post.published_at,
  seo_title: post.seo_title,
  seo_description: post.seo_description,
});

/* The fields that matter for "unsaved changes". */
const snapshot = (input: PostInput) =>
  JSON.stringify({ ...input, status: undefined });

type Action =
  | "draft"
  | "publish"
  | "update"
  | "unpublish"
  | "archive"
  | "restore"
  | "delete";

type ConfirmKind = "unpublish" | "archive" | "delete" | null;

const FIELD_ORDER: Array<keyof PostInput> = [
  "title",
  "slug",
  "excerpt",
  "content",
  "category_slug",
  "cover_image_alt",
  "author_name",
  "seo_title",
  "seo_description",
];

/* Each post (and "new") gets a fresh editor instance, so
   no state can leak from one post into another. */
const AdminPostEditorRoute = () => {
  const { id } = useParams();

  return <AdminPostEditor key={id ?? "new"} id={id ?? null} />;
};

export default AdminPostEditorRoute;

const AdminPostEditor = ({ id }: { id: string | null }) => {
  const isNew = id === null;
  const navigate = useNavigate();
  const { notify } = useNewsroom();
  const { categories } = useCategories();

  const [post, setPost] = useState<AdminPost | null>(null);
  const [form, setForm] = useState<PostInput>(EMPTY_POST);
  const [baseline, setBaseline] = useState(snapshot(EMPTY_POST));
  const [loadState, setLoadState] = useState<"loading" | "ready" | "missing" | "error">(
    isNew ? "ready" : "loading"
  );
  const [errors, setErrors] = useState<PostFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<Action | null>(null);
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [slugTouched, setSlugTouched] = useState(false);
  const [slugUnlocked, setSlugUnlocked] = useState(false);
  const [slugTaken, setSlugTaken] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverError, setCoverError] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmKind>(null);
  const [editorKey, setEditorKey] = useState(0);
  const { now, refresh: refreshNow } = useNow();

  const allowNavigation = useRef(false);

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    if (id === null) return;

    let active = true;

    getAdminPost(id)
      .then((result) => {
        if (!active) return;

        if (!result) {
          setLoadState("missing");
          return;
        }

        const input = toInput(result);

        setPost(result);
        setForm(input);
        setBaseline(snapshot(input));
        setSlugTouched(true);
        setEditorKey((key) => key + 1);
        setLoadState("ready");
      })
      .catch(() => {
        if (active) setLoadState("error");
      });

    return () => {
      active = false;
    };
  }, [id]);

  /* =======================================================
     DERIVED STATE
  ======================================================= */

  const savedStatus = post
    ? getDisplayStatus(post.status, post.published_at, new Date(now))
    : "draft";

  const isLive = savedStatus === "published";
  const slugLocked = isLive && !slugUnlocked;
  const dirty = snapshot(form) !== baseline;

  const scheduleIsFuture = Boolean(
    form.published_at && new Date(form.published_at).getTime() > now
  );

  /* =======================================================
     UNSAVED CHANGES
  ======================================================= */

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !allowNavigation.current &&
      dirty &&
      currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (!dirty) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);

    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  /* Release object URLs used for local image previews. */
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  useDocumentTitle(isNew ? "New post" : form.title || "Edit post");

  /* =======================================================
     FIELD HELPERS
  ======================================================= */

  const update = <K extends keyof PostInput>(key: K, value: PostInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFormError("");
  };

  const handleTitle = (value: string) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched ? current.slug : slugify(value),
    }));
    setErrors((current) => ({ ...current, title: undefined, slug: undefined }));
    setSlugTaken(false);
  };

  const handleSlug = (value: string) => {
    setSlugTouched(true);
    setSlugTaken(false);
    update("slug", value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-"));
  };

  const checkSlug = async () => {
    const slug = form.slug.replace(/^-+|-+$/g, "");

    if (slug !== form.slug) update("slug", slug);

    if (!SLUG_PATTERN.test(slug)) return;

    try {
      setSlugTaken(!(await isSlugAvailable(slug, post?.id ?? null)));
    } catch {
      /* The database will still enforce uniqueness on save. */
    }
  };

  /* =======================================================
     COVER IMAGE
  ======================================================= */

  const handleCoverFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const problem = validateImageFile(file);

    if (problem) {
      setCoverError(problem);
      return;
    }

    setCoverError("");
    setCoverUploading(true);
    setCoverPreview(URL.createObjectURL(file));

    try {
      const url = await uploadNewsImage(file, "covers");
      update("cover_image_url", url);
      notify("Cover image uploaded. Save the post to keep it.");
    } catch (error) {
      setCoverError(
        error instanceof Error ? error.message : "The image could not be uploaded."
      );
    } finally {
      setCoverUploading(false);
      setCoverPreview(null);
    }
  };

  const uploadContentImage = useCallback(
    (file: File) => uploadNewsImage(file, "content"),
    []
  );

  /* =======================================================
     SAVE / STATUS CHANGES
  ======================================================= */

  const showErrors = (fieldErrors: PostFieldErrors) => {
    setErrors(fieldErrors);
    setFormError("Please fix the highlighted fields.");
    setView("edit");

    const first = FIELD_ORDER.find((key) => fieldErrors[key]);

    window.setTimeout(() => {
      const target = first ? document.getElementById(`post-${first}`) : null;
      target?.focus();
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 50);
  };

  const applySaved = (saved: AdminPost) => {
    const input = toInput(saved);

    refreshNow();
    setPost(saved);
    setForm(input);
    setBaseline(snapshot(input));
    setErrors({});
    setFormError("");
  };

  const save = async (action: Action, status: PostStatus) => {
    const input: PostInput = { ...form, status };
    const fieldErrors = validatePost(input);

    if (slugTaken) {
      fieldErrors.slug = "Another post already uses this URL slug.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      showErrors(fieldErrors);
      return;
    }

    setBusy(action);

    try {
      const saved = post
        ? await updatePost(post.id, input, post.updated_at)
        : await createPost(input);

      applySaved(saved);

      const live = getDisplayStatus(saved.status, saved.published_at);

      notify(
        action === "draft"
          ? "Draft saved."
          : live === "scheduled"
            ? `Scheduled for ${formatDateTime(saved.published_at)}.`
            : live === "published"
              ? action === "publish"
                ? "Published. The article is now live on the News page."
                : "Changes saved and live."
              : "Changes saved."
      );

      if (!post) {
        /* This instance unmounts once the new URL is active. */
        allowNavigation.current = true;
        navigate(`/admin/posts/${saved.id}`, { replace: true });
      }
    } catch (error) {
      setFormError(
        error instanceof StaleWriteError
          ? error.message
          : toFriendlyError(error, "The post could not be saved. Your changes are still here; please try again.")
      );
    } finally {
      setBusy(null);
    }
  };

  const changeStatus = async (action: Action, status: PostStatus) => {
    if (!post) return;

    setBusy(action);

    try {
      const saved = await setPostStatus(post.id, status, post.updated_at);

      /* Keep any unsaved edits in the form; only adopt the
         new status and timestamps from the server. */
      refreshNow();
      setPost(saved);
      setForm((current) => ({ ...current, status: saved.status }));

      notify(
        action === "unpublish"
          ? "Unpublished. The article is no longer visible to the public."
          : action === "archive"
            ? "Archived. The article is hidden from the public site."
            : "Restored to drafts."
      );
    } catch (error) {
      notify(
        error instanceof StaleWriteError
          ? error.message
          : toFriendlyError(error, "The status could not be changed."),
        "error"
      );
    } finally {
      setBusy(null);
      setConfirm(null);
    }
  };

  const remove = async () => {
    if (!post) return;

    setBusy("delete");

    try {
      await deletePost(post.id);
      notify(`“${post.title}” was deleted.`);
      allowNavigation.current = true;
      navigate("/admin/posts", { replace: true });
    } catch (error) {
      notify(toFriendlyError(error, "The post could not be deleted."), "error");
      setBusy(null);
      setConfirm(null);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  if (loadState === "loading") {
    return <Notice aria-busy="true">Loading post…</Notice>;
  }

  if (loadState === "missing" || loadState === "error") {
    return (
      <Notice>
        <Alert role="alert">
          {loadState === "missing"
            ? "This post doesn't exist. It may have been deleted."
            : "The post couldn't be loaded. Please try again."}
        </Alert>
        <Button as={Link} to="/admin/posts" $size="sm">
          Back to all posts
        </Button>
      </Notice>
    );
  }

  const working = busy !== null || coverUploading;
  const publishLabel = scheduleIsFuture ? "Schedule" : "Publish now";

  return (
    <Page>
      {/* ===================================================
          HEADER + PRIMARY ACTIONS
      =================================================== */}

      <EditorHeader>
        <div>
          <BackLink to="/admin/posts">← All posts</BackLink>
          <TitleRow>
            <PageTitle>{isNew ? "New post" : "Edit post"}</PageTitle>
            {!isNew && <StatusBadge status={savedStatus} />}
            {dirty && <Unsaved>Unsaved changes</Unsaved>}
          </TitleRow>
          {post && (
            <Hint>
              Last saved {formatDateTime(post.updated_at)}
              {isLive && (
                <>
                  {" · "}
                  <a href={`${NEWS_BASE}/${post.slug}`} target="_blank" rel="noopener">
                    View live article ↗
                  </a>
                </>
              )}
            </Hint>
          )}
        </div>

        <HeaderActions>
          <ViewToggle role="group" aria-label="Editor view">
            <button type="button" aria-pressed={view === "edit"} onClick={() => setView("edit")}>
              Edit
            </button>
            <button type="button" aria-pressed={view === "preview"} onClick={() => setView("preview")}>
              Preview
            </button>
          </ViewToggle>

          {(isNew || savedStatus === "draft") && (
            <>
              <Button type="button" onClick={() => save("draft", "draft")} disabled={working} aria-busy={busy === "draft"}>
                {busy === "draft" ? "Saving…" : "Save draft"}
              </Button>
              <Button type="button" $variant="primary" onClick={() => save("publish", "published")} disabled={working} aria-busy={busy === "publish"}>
                {busy === "publish" ? "Publishing…" : publishLabel}
              </Button>
            </>
          )}

          {(savedStatus === "published" || savedStatus === "scheduled") && (
            <Button type="button" $variant="primary" onClick={() => save("update", "published")} disabled={working || !dirty} aria-busy={busy === "update"}>
              {busy === "update" ? "Saving…" : savedStatus === "scheduled" ? "Save schedule" : "Update article"}
            </Button>
          )}

          {savedStatus === "archived" && (
            <Button type="button" $variant="primary" onClick={() => save("update", "archived")} disabled={working || !dirty} aria-busy={busy === "update"}>
              {busy === "update" ? "Saving…" : "Save changes"}
            </Button>
          )}
        </HeaderActions>
      </EditorHeader>

      {formError && (
        <Alert role="alert">
          {formError}
          {formError.includes("changed or deleted") && (
            <>
              {" "}
              <InlineButton type="button" onClick={() => window.location.reload()}>
                Reload post
              </InlineButton>
            </>
          )}
        </Alert>
      )}

      {view === "preview" ? (
        <ArticlePreview form={form} />
      ) : (
        <Layout>
          {/* =================================================
              MAIN COLUMN
          ================================================= */}

          <MainColumn>
            <Panel>
              <PanelBody>
                <Stack>
                  <FormField
                    id="post-title"
                    label="Title"
                    error={errors.title}
                    count={[form.title.length, LIMITS.titleMax]}
                  >
                    <TitleInput
                      id="post-title"
                      value={form.title}
                      maxLength={LIMITS.titleMax}
                      placeholder="Write a clear, specific headline"
                      $invalid={Boolean(errors.title)}
                      aria-invalid={Boolean(errors.title)}
                      aria-describedby={errors.title ? "post-title-error" : undefined}
                      onChange={(event) => handleTitle(event.target.value)}
                    />
                  </FormField>

                  <FormField
                    id="post-slug"
                    label="URL slug"
                    error={errors.slug ?? (slugTaken ? "Another post already uses this URL slug." : undefined)}
                    hint={`regalaffluence.com/news/${form.slug || "your-article"}`}
                  >
                    <SlugRow>
                      <Input
                        id="post-slug"
                        value={form.slug}
                        maxLength={LIMITS.slugMax}
                        disabled={slugLocked}
                        $invalid={Boolean(errors.slug || slugTaken)}
                        aria-invalid={Boolean(errors.slug || slugTaken)}
                        aria-describedby="post-slug-hint post-slug-error"
                        onChange={(event) => handleSlug(event.target.value)}
                        onBlur={checkSlug}
                      />
                      {slugLocked && (
                        <Button type="button" $size="sm" onClick={() => setSlugUnlocked(true)}>
                          Change URL
                        </Button>
                      )}
                    </SlugRow>
                    {isLive && slugUnlocked && (
                      <Alert $tone="info">
                        This article is live. Changing its URL will break links
                        that have already been shared.
                      </Alert>
                    )}
                  </FormField>

                  <FormField
                    id="post-excerpt"
                    label="Short excerpt"
                    error={errors.excerpt}
                    hint="Shown on news cards and in search results. One or two sentences."
                    count={[form.excerpt.length, LIMITS.excerptMax]}
                  >
                    <Textarea
                      id="post-excerpt"
                      value={form.excerpt}
                      maxLength={LIMITS.excerptMax}
                      rows={3}
                      $invalid={Boolean(errors.excerpt)}
                      aria-invalid={Boolean(errors.excerpt)}
                      aria-describedby="post-excerpt-hint post-excerpt-error"
                      onChange={(event) => update("excerpt", event.target.value)}
                    />
                  </FormField>

                  <Field>
                    <Label as="span" id="post-content-label">
                      Article body
                    </Label>
                    <RichTextEditor
                      key={editorKey}
                      id="post-content"
                      initialHtml={form.content}
                      invalid={Boolean(errors.content)}
                      describedBy={errors.content ? "post-content-error" : undefined}
                      onChange={(html) => update("content", html)}
                      onUploadImage={uploadContentImage}
                    />
                    {errors.content && (
                      <FieldError id="post-content-error">{errors.content}</FieldError>
                    )}
                  </Field>
                </Stack>
              </PanelBody>
            </Panel>
          </MainColumn>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <Sidebar>
            <Panel aria-labelledby="publishing-heading">
              <PanelHeader>
                <h2 id="publishing-heading">Publishing</h2>
              </PanelHeader>
              <PanelBody>
                <Stack>
                  <FormField
                    id="post-published_at"
                    label="Publication date"
                    hint={
                      scheduleIsFuture
                        ? `Goes live automatically on ${formatDateTime(form.published_at)}.`
                        : "Leave empty to publish immediately. Choose a future date to schedule."
                    }
                  >
                    <Input
                      id="post-published_at"
                      type="datetime-local"
                      value={toLocalInputValue(form.published_at)}
                      aria-describedby="post-published_at-hint"
                      onChange={(event) => update("published_at", fromLocalInputValue(event.target.value))}
                    />
                  </FormField>

                  <Checkbox>
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(event) => update("is_featured", event.target.checked)}
                    />
                    <span>
                      Feature this article
                      <Hint as="span" style={{ display: "block" }}>
                        The newest featured article is highlighted at the top of
                        the News page.
                      </Hint>
                    </span>
                  </Checkbox>

                  {post && (
                    <SecondaryActions>
                      {savedStatus === "published" && (
                        <Button type="button" $size="sm" onClick={() => setConfirm("unpublish")} disabled={working}>
                          Unpublish
                        </Button>
                      )}
                      {savedStatus === "scheduled" && (
                        <Button type="button" $size="sm" onClick={() => changeStatus("unpublish", "draft")} disabled={working}>
                          {busy === "unpublish" ? "Working…" : "Cancel schedule"}
                        </Button>
                      )}
                      {savedStatus === "archived" ? (
                        <Button type="button" $size="sm" onClick={() => changeStatus("restore", "draft")} disabled={working}>
                          {busy === "restore" ? "Working…" : "Restore to drafts"}
                        </Button>
                      ) : (
                        <Button type="button" $size="sm" onClick={() => setConfirm("archive")} disabled={working}>
                          Archive
                        </Button>
                      )}
                      <Button type="button" $size="sm" $variant="ghost" onClick={() => setConfirm("delete")} disabled={working}>
                        <DangerText>Delete…</DangerText>
                      </Button>
                    </SecondaryActions>
                  )}
                </Stack>
              </PanelBody>
            </Panel>

            <Panel aria-labelledby="details-heading">
              <PanelHeader>
                <h2 id="details-heading">Details</h2>
              </PanelHeader>
              <PanelBody>
                <Stack>
                  <FormField id="post-category_slug" label="Category" error={errors.category_slug}>
                    <Select
                      id="post-category_slug"
                      value={form.category_slug ?? ""}
                      $invalid={Boolean(errors.category_slug)}
                      aria-invalid={Boolean(errors.category_slug)}
                      aria-describedby="post-category_slug-error"
                      onChange={(event) => update("category_slug", event.target.value || null)}
                    >
                      <option value="">Choose a category</option>
                      {categories.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </FormField>

                  <FormField
                    id="post-author_name"
                    label="Author name"
                    error={errors.author_name}
                    hint="Optional. Shown on the article."
                  >
                    <Input
                      id="post-author_name"
                      value={form.author_name ?? ""}
                      maxLength={LIMITS.authorMax}
                      aria-describedby="post-author_name-hint"
                      onChange={(event) => update("author_name", event.target.value || null)}
                    />
                  </FormField>
                </Stack>
              </PanelBody>
            </Panel>

            <Panel aria-labelledby="cover-heading">
              <PanelHeader>
                <h2 id="cover-heading">Cover image</h2>
              </PanelHeader>
              <PanelBody>
                <Stack>
                  <CoverFrame aria-busy={coverUploading}>
                    {coverPreview || form.cover_image_url ? (
                      <CoverImage
                        src={coverPreview ?? form.cover_image_url}
                        alt={form.cover_image_alt || "Cover image preview"}
                      />
                    ) : (
                      <CoverPlaceholder>No cover image</CoverPlaceholder>
                    )}
                    {coverUploading && <Uploading>Uploading…</Uploading>}
                  </CoverFrame>

                  <CoverActions>
                    <FileButton>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        disabled={coverUploading}
                        onChange={handleCoverFile}
                      />
                      <span>{form.cover_image_url ? "Replace image" : "Upload image"}</span>
                    </FileButton>
                    {form.cover_image_url && (
                      <Button
                        type="button"
                        $size="sm"
                        $variant="ghost"
                        onClick={() => update("cover_image_url", null)}
                        disabled={coverUploading}
                      >
                        Remove
                      </Button>
                    )}
                  </CoverActions>

                  <Hint>JPG, PNG, WebP, or AVIF up to 5 MB. Landscape images around 1600 × 1000 work best.</Hint>
                  {coverError && <FieldError role="alert">{coverError}</FieldError>}

                  <FormField
                    id="post-cover_image_alt"
                    label="Image description (alt text)"
                    error={errors.cover_image_alt}
                    hint="Describe what the image shows for people using screen readers."
                    count={[form.cover_image_alt.length, LIMITS.altMax]}
                  >
                    <Textarea
                      id="post-cover_image_alt"
                      rows={2}
                      value={form.cover_image_alt}
                      maxLength={LIMITS.altMax}
                      $invalid={Boolean(errors.cover_image_alt)}
                      aria-invalid={Boolean(errors.cover_image_alt)}
                      aria-describedby="post-cover_image_alt-hint post-cover_image_alt-error"
                      onChange={(event) => update("cover_image_alt", event.target.value)}
                    />
                  </FormField>
                </Stack>
              </PanelBody>
            </Panel>

            <Panel as="details" aria-label="Search and social">
              <SeoSummary>Search &amp; social (optional)</SeoSummary>
              <PanelBody>
                <Stack>
                  <FormField
                    id="post-seo_title"
                    label="SEO title"
                    error={errors.seo_title}
                    hint="Defaults to the article title."
                    count={[(form.seo_title ?? "").length, 60]}
                  >
                    <Input
                      id="post-seo_title"
                      value={form.seo_title ?? ""}
                      maxLength={LIMITS.seoTitleMax}
                      placeholder={form.title}
                      aria-describedby="post-seo_title-hint"
                      onChange={(event) => update("seo_title", event.target.value || null)}
                    />
                  </FormField>

                  <FormField
                    id="post-seo_description"
                    label="Meta description"
                    error={errors.seo_description}
                    hint="Defaults to the excerpt. Around 155 characters is ideal."
                    count={[(form.seo_description ?? "").length, 160]}
                  >
                    <Textarea
                      id="post-seo_description"
                      rows={3}
                      value={form.seo_description ?? ""}
                      maxLength={LIMITS.seoDescriptionMax}
                      placeholder={form.excerpt}
                      aria-describedby="post-seo_description-hint"
                      onChange={(event) => update("seo_description", event.target.value || null)}
                    />
                  </FormField>
                </Stack>
              </PanelBody>
            </Panel>
          </Sidebar>
        </Layout>
      )}

      {/* ===================================================
          DIALOGS
      =================================================== */}

      <ConfirmDialog
        open={confirm === "unpublish"}
        title="Unpublish this article?"
        confirmLabel="Unpublish"
        busy={busy === "unpublish"}
        onConfirm={() => changeStatus("unpublish", "draft")}
        onCancel={() => setConfirm(null)}
      >
        It will be removed from the News page immediately and its link
        will stop working. It is kept as a draft so you can publish it
        again later.
      </ConfirmDialog>

      <ConfirmDialog
        open={confirm === "archive"}
        title="Archive this article?"
        confirmLabel="Archive"
        busy={busy === "archive"}
        onConfirm={() => changeStatus("archive", "archived")}
        onCancel={() => setConfirm(null)}
      >
        Archived articles are hidden from the public site but kept in
        the newsroom. You can restore it to drafts at any time.
      </ConfirmDialog>

      <ConfirmDialog
        open={confirm === "delete"}
        title="Delete this post permanently?"
        confirmLabel="Delete permanently"
        busy={busy === "delete"}
        onConfirm={remove}
        onCancel={() => setConfirm(null)}
      >
        <strong>“{post?.title}”</strong> will be deleted and cannot be
        recovered. If you only want to hide it, archive it instead.
      </ConfirmDialog>

      <ConfirmDialog
        open={blocker.state === "blocked"}
        title="Leave without saving?"
        confirmLabel="Discard changes"
        onConfirm={() => blocker.proceed?.()}
        onCancel={() => blocker.reset?.()}
      >
        You have unsaved changes to this post. If you leave now, they
        will be lost.
      </ConfirmDialog>
    </Page>
  );
};


/* =========================================================
   FORM FIELD
========================================================= */

const FormField = ({
  id,
  label,
  error,
  hint,
  count,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  count?: [number, number];
  children: ReactNode;
}) => (
  <Field>
    <LabelRow>
      <Label htmlFor={id}>{label}</Label>
      {count && (
        <CharCount $over={count[0] > count[1]}>
          {count[0]} / {count[1]}
        </CharCount>
      )}
    </LabelRow>
    {children}
    {hint && <Hint id={`${id}-hint`}>{hint}</Hint>}
    {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
  </Field>
);

/* =========================================================
   PREVIEW
   Uses the same components as the public article page.
========================================================= */

const ArticlePreview = ({ form }: { form: PostInput }) => {
  const { nameFor } = useCategories();
  const categoryName = nameFor(form.category_slug);
  const date = form.published_at ?? new Date().toISOString();

  return (
    <PreviewFrame aria-label="Article preview">
      <PreviewNote>Preview — this is how the article will appear to visitors.</PreviewNote>

      <PreviewArticle>
        {categoryName && <CategoryTag>{categoryName}</CategoryTag>}
        <PreviewTitle>{form.title || "Untitled article"}</PreviewTitle>
        {form.excerpt && <PreviewStandfirst>{form.excerpt}</PreviewStandfirst>}
        <MetaRow>
          <span>{formatDate(date)}</span>
          {form.author_name && (
            <>
              <span aria-hidden="true">·</span>
              <span>By {form.author_name}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(form.content)} min read</span>
        </MetaRow>

        {form.cover_image_url && (
          <PreviewCover>
            <CoverImage src={form.cover_image_url} alt={form.cover_image_alt} ratio="16 / 9" />
          </PreviewCover>
        )}

        <ArticleContent html={form.content || "<p><em>No article body yet.</em></p>"} />
      </PreviewArticle>
    </PreviewFrame>
  );
};

/* =========================================================
   DOCUMENT TITLE
========================================================= */

const useDocumentTitle = (title: string) => {
  const full = useMemo(() => `${title} · Newsroom | Regal Affluence`, [title]);

  useEffect(() => {
    const previous = document.title;
    document.title = full;

    return () => {
      document.title = previous;
    };
  }, [full]);
};

/* =========================================================
   STYLES
========================================================= */

const Notice = styled.div`
  display: grid;
  justify-items: start;
  gap: 16px;

  padding: 40px 0;

  color: ${({ theme }) => theme.colors.textMuted};
`;

const EditorHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
`;

const BackLink = styled(Link)`
  display: inline-block;

  margin-bottom: 8px;

  color: ${({ theme }) => theme.colors.purple};

  font-size: 14px;
  font-weight: 600;
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  margin-bottom: 4px;
`;

const Unsaved = styled.span`
  color: #8a6a2c;

  font-size: 13px;
  font-weight: 600;
`;

const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const ViewToggle = styled.div`
  display: flex;

  padding: 3px;

  border: 1px solid rgba(77, 48, 108, 0.14);
  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.white};

  button {
    min-height: 40px;

    padding: 0 16px;

    border-radius: ${({ theme }) => theme.radius.pill};

    color: ${({ theme }) => theme.colors.textMuted};

    font-size: 14px;
    font-weight: 600;

    &[aria-pressed="true"] {
      background: ${({ theme }) => theme.colors.purpleDeep};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  align-items: start;
  gap: 24px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  min-width: 0;
`;

const Sidebar = styled.div`
  display: grid;
  gap: 20px;
`;

const Stack = styled.div`
  display: grid;
  gap: 22px;
`;

const TitleInput = styled(Input)`
  height: auto;

  padding: 12px 14px;

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
`;

const SlugRow = styled.div`
  display: flex;
  gap: 10px;

  ${Input} {
    flex: 1;
  }
`;

const SecondaryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  padding-top: 18px;

  border-top: 1px solid rgba(77, 48, 108, 0.08);
`;

const DangerText = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const CoverFrame = styled.div`
  position: relative;

  overflow: hidden;

  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.ivory};
`;

const CoverPlaceholder = styled.div`
  display: grid;
  place-items: center;

  aspect-ratio: 16 / 10;

  border: 1px dashed rgba(77, 48, 108, 0.2);
  border-radius: ${({ theme }) => theme.radius.sm};

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;
`;

const Uploading = styled.div`
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  background: rgba(30, 10, 60, 0.55);
  color: ${({ theme }) => theme.colors.white};

  font-size: 14px;
  font-weight: 600;
`;

const CoverActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FileButton = styled.label`
  position: relative;

  display: inline-flex;
  align-items: center;

  min-height: 38px;

  padding: 0 16px;

  border: 1px solid rgba(91, 33, 182, 0.24);
  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  input {
    position: absolute;
    inset: 0;

    width: 100%;

    opacity: 0;

    cursor: pointer;
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.champagne};
    outline-offset: 3px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.purple};
  }
`;

const SeoSummary = styled.summary`
  padding: 18px 22px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
`;

const InlineButton = styled.button`
  color: inherit;

  font-weight: 700;
  text-decoration: underline;
`;

const PreviewFrame = styled.section`
  padding: clamp(24px, 5vw, 64px) 20px;

  border: 1px solid rgba(77, 48, 108, 0.1);
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.ivory};
`;

const PreviewNote = styled.p`
  max-width: 760px;

  margin: 0 auto 32px;
  padding: 10px 14px;

  border-radius: ${({ theme }) => theme.radius.sm};

  background: rgba(201, 169, 110, 0.16);
  color: #6b5222;

  font-size: 14px;
`;

const PreviewArticle = styled.article`
  display: grid;
  gap: 20px;

  max-width: 760px;

  margin: 0 auto;
`;

const PreviewTitle = styled.h2`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.03em;
`;

const PreviewStandfirst = styled.p`
  color: rgba(46, 36, 54, 0.78);

  font-size: 1.2rem;
  line-height: 1.65;
`;

const PreviewCover = styled.div`
  overflow: hidden;

  margin: 12px 0;

  border-radius: ${({ theme }) => theme.radius.md};
`;
