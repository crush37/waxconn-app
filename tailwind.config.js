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
        extend: {
            scale: {
                '200': '2',
            }
        },
    },
    variants: {
        scrollbar: ['dark'],
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar')
    ]
}
