module.exports = {
    important: true,
    corePlugins: {
        outline: false
    },
    content: [
        "./src/**/*.{html,ts}",
        "./projects/**/*.{html,ts}"
    ],
    theme: {
        extend: {},
    },
    variants: {
        scrollbar: ['dark'],
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar')
    ]
}
