import { useEffect, useMemo, useState } from "react";

import { listCategories } from "../api/newsApi";
import type { NewsCategory } from "./types";

/* =========================================================
   CATEGORIES
   Loaded once per page load and shared by every component.
========================================================= */

let cached: Promise<NewsCategory[]> | null = null;

const loadCategories = () => {
  if (!cached) {
    cached = listCategories().catch((error) => {
      cached = null;
      throw error;
    });
  }

  return cached;
};

const useCategories = () => {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    loadCategories()
      .then((result) => {
        if (active) setCategories(result);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const nameFor = useMemo(() => {
    const names = new Map(
      categories.map((category) => [category.slug, category.name])
    );

    return (slug: string | null) =>
      slug ? names.get(slug) ?? "" : "";
  }, [categories]);

  return { categories, failed, nameFor };
};

export default useCategories;
