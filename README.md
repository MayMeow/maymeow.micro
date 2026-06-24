# maymeow.fyi

Small static microblog.

I generating new posts using this:

```bash
hugo new "p/$([Guid]::NewGuid().ToString().Replace('-', '').Substring(0,13))/index.md"
```

and then push changes to repository

```bash
git add . && git commit -m "Add new post" && git push
```
