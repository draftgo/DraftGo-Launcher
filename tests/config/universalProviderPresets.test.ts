import { describe, expect, it } from "vitest";
import { universalProviderPresets } from "@/config/universalProviderPresets";

describe("universalProviderPresets", () => {
  it("将 DraftGo 作为固定地址的默认快速配置", () => {
    expect(universalProviderPresets[0]).toMatchObject({
      name: "DraftGo API",
      providerType: "draftgo",
      defaultBaseUrl: "https://api.draftgo.cn",
      quickSetup: true,
      defaultApps: {
        claude: true,
        codex: true,
        gemini: true,
      },
    });
  });

  it("不再提供第三方通用供应商预设", () => {
    expect(universalProviderPresets.map((preset) => preset.providerType)).toEqual(
      ["draftgo", "custom_gateway"],
    );
  });
});
