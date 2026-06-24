## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Markdown 内容创作规范（YAML Frontmatter）

所有文章在 `src/content/articles/<category>/` 下，使用 Astro Content Collections。
Schema 定义在 `src/content.config.ts`。

### 必须遵守的 Frontmatter 格式规则

**这些规则是用 bug 换来的，请严格遵守，否则 Astro 构建会直接失败。**

#### 1. `date` 字段必须用引号包裹

✅ 正确：
```yaml
date: "2026-06-24"
```

❌ 错误（Astro 会将其解析为 Date 对象而非 string，导致 schema 校验失败）：
```yaml
date: 2026-06-24
```

> **原因**：YAML 规范中 `2026-06-24` 是一个合法的日期字面量，会被解析为 Date 类型。而 schema 中 `date: z.string()` 要求字符串。

#### 2. `title` 和 `excerpt` 中的引号必须正确处理

中文内容经常包含 `""`（中文引号），如果 title/excerpt 用英文双引号包裹，中文引号会破坏 YAML 解析。

✅ 正确（用单引号包裹，内部双引号安全）：
```yaml
title: '负空间观察法：画"什么都不是"的地方'
```

✅ 正确（标题不含引号时，双引号或单引号均可）：
```yaml
title: "体块化训练——用方盒子搭建人体"
```

❌ 错误（英文双引号内嵌中文双引号，YAML 解析器会提前关闭字符串）：n```yaml
title: "负空间观察法：画"什么都不是"的地方"  
```

> **规则**：如果 title 或 excerpt 的值中包含 `"` 字符（中文引号也算），外层用**单引号**包裹。

#### 3. Frontmatter 模板

每篇文章的 frontmatter 应遵循此模板：

```yaml
---
title: "文章标题"  # 或用单引号（见规则 2）
category: sketch  # sketch | calligraphy | appreciation | practice
phase: 5  # 可选，速写阶段编号
level: "进阶"  # "入门" | "进阶" | "高级"（可选）
tags: ["标签1", "标签2"]  # 数组格式
excerpt: "摘要文字"  # 可选（见规则 2）
date: "2026-06-24"  # 必须加引号（见规则 1）
---
```

### 部署流程

1. 内容写入 `src/content/articles/<category>/` 目录
2. 更新 `memory/content-progress.md`
3. `git add && git commit && git push`（触发 GitHub Actions 自动构建部署）
4. 如果 `git push` 因网络超时，可用 `gh api` 逐文件推送：
   ```bash
   gh api repos/Voley-Gong/sketch-calligraphy/contents/<path> \
     -X PUT \
     -f message="commit message" \
     -f content="$(base64 -w 0 < <file>)" \
     -f branch=main \
     -f sha="$(gh api repos/Voley-Gong/sketch-calligraphy/contents/<path> --jq '.sha')" \
     --jq '.content.path'
   ```
5. 推送后检查构建状态：
   ```bash
   gh api repos/Voley-Gong/sketch-calligraphy/actions/runs --jq '.workflow_runs[0] | {status, conclusion}'
   ```

### 分类与轮换

内容按以下顺序轮换生成：
sketch → calligraphy → sketch → appreciation → sketch → practice → (循环)

详见 `memory/content-progress.md`。
