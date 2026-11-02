const paths={
home:'M3 10.5 12 3l9 7.5V21h-6v-7H9v7H3Z',sparkles:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z M20 2v4m-2-2h4',
shirt:'m8 3-5 3-2 5 5 2v8h12v-8l5-2-2-5-5-3c0 4-8 4-8 0Z',bottom:'M6 3h12l2 18h-7l-1-11-1 11H4Z M6 7h12',
scissors:'M8 8 20 20M8 16 20 4 M9 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',smile:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8 14c2 3 6 3 8 0M8 9h.01M16 9h.01',
shoe:'M3 15V7h5l2 5 5 2h5l2 3v4H3Z M3 18h19',paw:'M9 13c-1 2-5 4-4 7s5 0 7 0 6 3 7 0-3-5-4-7-5-2-6 0ZM5 5c-3 0-3 6 0 6s3-6 0-6ZM11 2c-3 0-3 7 0 7s3-7 0-7ZM17 4c-3 0-3 7 0 7s3-7 0-7ZM21 9c-2 0-3 5-1 5s3-5 1-5Z',
image:'M3 3h18v18H3Z M3 17l6-6 4 4 3-3 5 6 M17 7h.01',camera:'M3 7h4l2-3h6l2 3h4v14H3Z M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
wardrobe:'M3 3h18v18H3Z M12 3v18M8 11v3m8-3v3 M5 21v2m14-2v2',room:'M3 21V3h18v18Z M3 15h18M8 3v12M11 7h7v5h-7Z',
game:'M6 8h12c4 0 6 12 2 12-2 0-3-4-5-4H9c-2 0-3 4-5 4C0 20 2 8 6 8ZM7 10v5M4.5 12.5h5M16 11h.01M19 14h.01',
trophy:'M7 3h10v6c0 8-10 8-10 0ZM7 5H3v3c0 3 2 5 5 5M17 5h4v3c0 3-2 5-5 5M12 15v6M8 21h8',
bag:'M4 7h16l1 14H3ZM8 8V6a4 4 0 0 1 8 0v2',users:'M16 21v-3a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v3M13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17 3a4 4 0 0 1 0 8M18 14a4 4 0 0 1 3 4v3',
star:'m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1Z',heart:'M20 4c-3-2-6 0-8 3-2-3-5-5-8-3-6 4 0 11 8 17 8-6 14-13 8-17Z',flower:'M12 8c-9-13-15 1-5 4-15 7-1 15 5 5 5 10 19 2 5-5 10-3 4-17-5-4Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
moon:'M20 14A8 8 0 0 1 10 4a9 9 0 1 0 10 10Z',sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2',
coffee:'M3 8h14v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5ZM17 9h2a3 3 0 0 1 0 6h-2M7 2v3m6-3v3',music:'M9 18V5l12-3v13M9 8l12-3 M9 18c0 4-7 4-7 1s7-4 7-1ZM21 15c0 4-7 4-7 1s7-4 7-1Z',
cloud:'M6 18a5 5 0 1 1 1-10 6 6 0 0 1 11-1 5 5 0 1 1 0 11Z',cards:'M7 3h14v16H7Z M3 7v14h14 M11 9l3-3 3 3-3 3Z',bolt:'m13 2-9 12h7l-1 8 10-13h-8Z',ball:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4 8c6 0 12 6 12 12M20 8C14 8 8 14 8 20',
palette:'M12 3a9 9 0 1 0 0 18h2c3 0 0-4 2-5h2c5 0 3-13-6-13ZM7 8h.01M12 6h.01M17 8h.01M6 13h.01',
arrow:'M5 12h14m-5-5 5 5-5 5',check:'m5 12 4 4L20 5',close:'m6 6 12 12M6 18 18 6',plus:'M12 5v14M5 12h14',minus:'M5 12h14',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
shuffle:'m3 4 14 16h4m-4-4 4 4-4 4M3 20l6-7m4-4 4-5h4m-4-4 4 4-4 4',undo:'M4 9h10a7 7 0 0 1 0 14M4 9l5-5M4 9l5 5',redo:'M20 9H10a7 7 0 0 0 0 14M20 9l-5-5M20 9l-5 5',
search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM15 15l7 7',lock:'M5 10h14v12H5ZM8 10V6a4 4 0 0 1 8 0v4',trash:'M3 6h18M5 6l1 16h12l1-16M9 6V2h6v4M9 10v8m6-8v8',copy:'M8 8h13v13H8ZM16 8V3H3v13h5',
settings:'M9 3h6l1 4 4 1v7l-4 1-1 5H9l-1-5-5-1V8l5-1ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',volume:'M3 9h4l5-5v16l-5-5H3ZM16 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14',mute:'M3 9h4l5-5v16l-5-5H3ZM16 9l6 6m0-6-6 6',
gift:'M3 8h18v5H3ZM5 13v9h14v-9M12 8v14M12 8C-2 6 8-4 12 8c4-12 14-2 0 0Z',clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 6v6l4 3',info:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 11v6m0-10h.01',
exit:'M9 3H3v18h6M9 12h12m-5-5 5 5-5 5',send:'m3 3 19 9-19 9 4-9ZM7 12h15',save:'M3 3h15l3 3v15H3ZM7 3v6h10V3M7 21v-8h10v8',expand:'M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5'
};
export function icon(name,cls=''){return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.sparkles}"/></svg>`;}
