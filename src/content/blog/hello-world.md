---
title: "Hello World — My First Blog Post"
date: 2026-04-27
tags: ["personal", "meta"]
excerpt: "Welcome to my blog. Here I'll share thoughts on backend development, system design, and life in Vietnam."
slug: "hello-world"
---

## Welcome

This is my first blog post. I built this blog feature directly into my portfolio
using **React Router**, a custom **Vite plugin** for build-time markdown, and
**Shiki** for syntax highlighting.

### A Code Example

Here's a simple Go HTTP handler:

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
```

### What's Next

I plan to write about:

- Building high-performance API gateways
- My experience moving to Vietnam
- Lessons from scaling backend systems

Stay tuned!
