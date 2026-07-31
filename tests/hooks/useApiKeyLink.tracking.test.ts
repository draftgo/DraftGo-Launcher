import { describe, expect, it } from "vitest";
import { removeTrackingParameters } from "@/components/providers/forms/hooks/useApiKeyLink";

describe("removeTrackingParameters", () => {
  it("移除推广参数并保留业务参数", () => {
    expect(
      removeTrackingParameters(
        "https://example.com/keys?aff=cc-switch&utm_source=launcher&region=cn",
      ),
    ).toBe("https://example.com/keys?region=cn");
  });
});
