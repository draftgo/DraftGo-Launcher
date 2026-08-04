# 发布流程

## 自动发布

将版本号写入 `package.json`、`src-tauri/Cargo.toml` 和
`src-tauri/tauri.conf.json` 后创建并推送 `v` 开头的 tag：

```powershell
git tag v3.19.1
git push origin v3.19.1
```

GitHub Actions 会为 Windows、Linux 和 macOS 编译安装包，随后自动创建正式
GitHub Release 并上传构建产物。

也可以在 Actions 页面手动运行 `Release`：

- 留空 `tag`：按当前默认分支的 `package.json` 版本自动发布 `v<版本号>`，
  不需要预先创建或推送 tag。
- 填写 `tag`：构建并发布该已存在的 tag（例如 `v3.19.1`）。

发布步骤会校验 Release 和已上传的安装包；如果没有任何产物被上传，工作流会
以失败结束，而不是显示成功但不产生下载内容。

## 签名

没有配置签名 Secret 时，流程仍会上传未签名的 MSI、AppImage、DEB、RPM、DMG
和 ZIP；此时不会生成 Tauri updater 的 `latest.json`。

要启用应用内自动更新，需要在仓库的 Actions Secrets 中配置与
`src-tauri/tauri.conf.json` 公钥匹配的 `TAURI_SIGNING_PRIVATE_KEY`，以及可选的
`TAURI_SIGNING_PRIVATE_KEY_PASSWORD`。

macOS 的签名和公证还需要配置 `APPLE_CERTIFICATE`、
`APPLE_CERTIFICATE_PASSWORD`、`KEYCHAIN_PASSWORD`、`APPLE_ID`、
`APPLE_PASSWORD` 和 `APPLE_TEAM_ID`。
