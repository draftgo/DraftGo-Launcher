# 发布流程

## 自动发布

将版本号写入 `package.json`、`src-tauri/Cargo.toml` 和
`src-tauri/tauri.conf.json` 后创建并推送 `v` 开头的 tag：

```powershell
git tag v3.19.1
git push origin v3.19.1
```

GitHub Actions 会为 Windows、Linux 和 macOS 编译安装包，随后自动创建正式
GitHub Release 并上传构建产物。也可以在 Actions 页面手动运行 `Release`，输入
一个已经存在的 tag。

## 签名

没有配置签名 Secret 时，流程仍会上传未签名的 MSI、AppImage、DEB、RPM、DMG
和 ZIP；此时不会生成 Tauri updater 的 `latest.json`。

要启用应用内自动更新，需要在仓库的 Actions Secrets 中配置与
`src-tauri/tauri.conf.json` 公钥匹配的 `TAURI_SIGNING_PRIVATE_KEY`，以及可选的
`TAURI_SIGNING_PRIVATE_KEY_PASSWORD`。

macOS 的签名和公证还需要配置 `APPLE_CERTIFICATE`、
`APPLE_CERTIFICATE_PASSWORD`、`KEYCHAIN_PASSWORD`、`APPLE_ID`、
`APPLE_PASSWORD` 和 `APPLE_TEAM_ID`。
