import { useEffect, useState } from "react";
import api from "../../lib/api";
import { MODULE_CONFIG } from "../components/CraftSection";
import type { SectionModuleType } from "../components/CraftSection";

export interface Category {
  id: string | number;
  name: string;
  slug?: string;
}

function normalizeCategoryPayload(payload: any): Category[] {
  const extractArray = (item: any): any[] | null => {
    if (Array.isArray(item)) return item;
    if (!item || typeof item !== "object") return null;

    const keys = ["data", "items", "results", "categories", "list"];
    for (const key of keys) {
      if (Array.isArray(item[key])) return item[key];
    }

    return null;
  };

  const candidates = [
    payload?.data?.response?.data,
    payload?.response?.data?.data,
    payload?.response?.data,
    payload?.data?.data,
    payload?.data,
    payload,
  ];

  const rawList = candidates
    .map((item) => extractArray(item))
    .find((item) => Array.isArray(item));

  if (!Array.isArray(rawList)) return [];

  return rawList
    .map((cat: any) => ({
      id: cat?.id ?? cat?._id ?? cat?.value ?? cat?.slug,
      name: cat?.name ?? cat?.title ?? cat?.category ?? cat?.label ?? "",
      slug: cat?.slug,
    }))
    .filter((cat: Category) => Boolean(cat.id) && Boolean(cat.name));
}

/**
 * Hook to fetch categories for a given module type
 * Returns loading state, error, and list of categories
 */
export function useCategoryDropdown(moduleType?: SectionModuleType) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!moduleType) {
      setCategories([]);
      setError(null);
      return;
    }

    const moduleConfig = MODULE_CONFIG[moduleType];
    if (!moduleConfig?.categoryApiPath) {
      setCategories([]);
      setError(null);
      return;
    }
    const categoryApiPath = moduleConfig.categoryApiPath;

    const fetchCategories = async () => {
      if (!isMounted) return;
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(categoryApiPath);
        const normalized = normalizeCategoryPayload(response);
        if (!isMounted) return;
        setCategories(normalized);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        if (!isMounted) return;
        setError("Failed to load categories");
        setCategories([]);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [moduleType]);

  return { categories, loading, error };
}
