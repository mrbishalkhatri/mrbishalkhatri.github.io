<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the homepage as a hybrid of the Gravity-inspired orbit design and the persistent scrolling 3D QA Lab, preserving full portfolio content.
- Homepage component depth interactions use delegated pointer events through `HomeInteractions` so motion stays consistent and lightweight.
- Keep the hero orbit impact as a finite CSS 3D sequence triggered by lightweight React state; this preserves performance and cleanly restores idle motion.
- Keep full articles in dedicated `/blog/*` routes and model the advanced CV builder as structured client state; this preserves shareable content and repeatable editing.
