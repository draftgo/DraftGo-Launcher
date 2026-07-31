import { useMemo } from "react";
import type { AppId } from "@/lib/api";
import type { ProviderCategory } from "@/types";
import type { ProviderPreset } from "@/config/claudeProviderPresets";
import type { CodexProviderPreset } from "@/config/codexProviderPresets";
import type { GeminiProviderPreset } from "@/config/geminiProviderPresets";
import type { OpenCodeProviderPreset } from "@/config/opencodeProviderPresets";
import type { ClaudeDesktopProviderPreset } from "@/config/claudeDesktopProviderPresets";

type PresetEntry = {
  id: string;
  preset:
    | ProviderPreset
    | CodexProviderPreset
    | GeminiProviderPreset
    | OpenCodeProviderPreset
    | ClaudeDesktopProviderPreset;
};

interface UseApiKeyLinkProps {
  appId: AppId;
  category?: ProviderCategory;
  selectedPresetId: string | null;
  presetEntries: PresetEntry[];
  formWebsiteUrl: string;
}

const TRACKING_QUERY_KEYS = new Set([
  "ac",
  "aff",
  "affiliate",
  "ch",
  "from",
  "invitecode",
  "ref",
  "rc",
  "source",
]);

export function removeTrackingParameters(value: string): string {
  if (!value) return value;

  try {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      const normalizedKey = key.toLowerCase();
      if (
        TRACKING_QUERY_KEYS.has(normalizedKey) ||
        normalizedKey.startsWith("utm_")
      ) {
        url.searchParams.delete(key);
      }
    }
    return url.toString();
  } catch {
    return value;
  }
}

/**
 * 管理 API Key 获取链接的显示和 URL
 */
export function useApiKeyLink({
  appId,
  category,
  selectedPresetId,
  presetEntries,
  formWebsiteUrl,
}: UseApiKeyLinkProps) {
  // 判断是否显示 API Key 获取链接
  const shouldShowApiKeyLink = useMemo(() => {
    return (
      category !== "official" &&
      (category === "cn_official" ||
        category === "aggregator" ||
        category === "third_party")
    );
  }, [category]);

  // 获取当前预设条目
  const currentPresetEntry = useMemo(() => {
    if (selectedPresetId && selectedPresetId !== "custom") {
      return presetEntries.find((item) => item.id === selectedPresetId);
    }
    return undefined;
  }, [selectedPresetId, presetEntries]);

  // 获取当前供应商的网址（用于 API Key 链接）
  const getWebsiteUrl = useMemo(() => {
    if (currentPresetEntry) {
      const preset = currentPresetEntry.preset;
      // 官方预设优先使用专用 API Key 页面，并移除推广追踪参数。
      if (
        preset.category === "cn_official" ||
        preset.category === "aggregator" ||
        preset.category === "third_party"
      ) {
        return removeTrackingParameters(
          preset.apiKeyUrl || preset.websiteUrl || "",
        );
      }
      return removeTrackingParameters(preset.websiteUrl || "");
    }
    return removeTrackingParameters(formWebsiteUrl || "");
  }, [currentPresetEntry, formWebsiteUrl]);

  return {
    shouldShowApiKeyLink:
      appId === "claude" ||
      appId === "claude-desktop" ||
      appId === "codex" ||
      appId === "gemini" ||
      appId === "opencode" ||
      appId === "openclaw" ||
      appId === "hermes"
        ? shouldShowApiKeyLink
        : false,
    websiteUrl: getWebsiteUrl,
    isPartner: false,
    partnerPromotionKey: undefined,
  };
}
