export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Накрутка инстаграм подписчиков, лайков, просмотров, комментариев...',
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=yes' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/static/assets/fonts/gordita.css',
        '~/static/assets/css/style.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['moment'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios", ['@nuxtjs/dotenv', { systemvars: true }, ],
        "@nuxtjs/auth-next",
        "@nuxtjs/toast",
        '@nuxtjs/router-extras'
    ],

    toast: {
        position: 'bottom-center',
        duration: 5000
    },

    axios: {
        baseURL: 'http://127.0.0.1:3001/api',
    },


    auth: {
        redirect: {
            login: '/',
            home: '/',
            logout: '/',
            callback: '/'
        },
        localStorage: false,
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer',
                    maxAge: 3600
                },
                user: {
                    property: 'user',
                    autoFetch: false
                },
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    refresh: { url: '/auth/refresh', method: 'post' },
                    logout: false,
                    user: { url: '/account/me', method: 'get' }
                }
            }
        },
        preserveState: true,
        watchLoggedIn: true
    },

    router: {
        middleware: ['auth']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}