# **[<Back](../README.md)**

## Getting Started

First, run the development server:

```bash
npm i --save-exact antd@5.19.3 @ant-design/nextjs-registry@1.0.0 query-string@9.1.0 @ant-design/icons@5.4.0
```

## Group layout

```
📂app
|
|--📂(layout1)
|  |--📂auth
|  |--⚛️layout.tsx
|
|--📂(layout2)
|  |--📂dashboard
|  |--⚛️layout.tsx
```

Name folder in `"( )"` make group routes,

Ex from folder construction above: we have router:
`/auth/` and `/dashboard/`
