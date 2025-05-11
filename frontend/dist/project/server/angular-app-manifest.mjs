
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/welcome",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VE4T5NMC.js",
      "chunk-7V4SZJ4D.js"
    ],
    "route": "/welcome"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2JNBKFG6.js",
      "chunk-DVLT4LCI.js",
      "chunk-32KWT6XQ.js"
    ],
    "route": "/accueil"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZBGJ7IBS.js",
      "chunk-S23QDJRY.js",
      "chunk-7V4SZJ4D.js",
      "chunk-DVLT4LCI.js",
      "chunk-LZFMMYBS.js",
      "chunk-7KJGJMGE.js"
    ],
    "route": "/gestion-etudiants"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-P6VH4JBL.js",
      "chunk-S23QDJRY.js",
      "chunk-7V4SZJ4D.js",
      "chunk-DVLT4LCI.js",
      "chunk-LZFMMYBS.js",
      "chunk-7KJGJMGE.js"
    ],
    "route": "/gestion-professeurs"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DVKJWHF6.js",
      "chunk-DVLT4LCI.js"
    ],
    "route": "/compte-admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-L4SIVGQR.js",
      "chunk-DVLT4LCI.js"
    ],
    "route": "/create-formation"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NM3AQTHI.js",
      "chunk-DVLT4LCI.js"
    ],
    "route": "/statistique"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WBLMSWYN.js",
      "chunk-DVLT4LCI.js"
    ],
    "route": "/create-test"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-45FEF7DA.js",
      "chunk-DVLT4LCI.js"
    ],
    "route": "/tests"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LJJQ6NEE.js"
    ],
    "route": "/test/1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LJJQ6NEE.js"
    ],
    "route": "/test/2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LJJQ6NEE.js"
    ],
    "route": "/test/3"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-LJJQ6NEE.js"
    ],
    "route": "/test/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LQR7JBAZ.js"
    ],
    "route": "/prof"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HSCJ6LSH.js"
    ],
    "route": "/etudiant"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5323, hash: 'bb28ef03e8c25fa851f610c5992b1b9818e47c97e8e1305b4663f229637f9694', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4754, hash: '6f4abd87773ab8c0e9c21ec99bebe372116e0e7027d6a52301cab1b8b3a68dce', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'welcome/index.html': {size: 34120, hash: 'b56d0360bcf191a730913bc3391d5861162d4547c37257e38a2212573abb8c05', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)},
    'accueil/index.html': {size: 26768, hash: '9a3d95ec74a4599978928bb57d7348e24f1c47e0481ed4340903117ad3112605', text: () => import('./assets-chunks/accueil_index_html.mjs').then(m => m.default)},
    'create-formation/index.html': {size: 20245, hash: 'b962adc6baa1429a5371f4eef1417146c605b8d98a2af439482a13f1c0c7a18d', text: () => import('./assets-chunks/create-formation_index_html.mjs').then(m => m.default)},
    'compte-admin/index.html': {size: 25713, hash: '51568716981a360d608fddcb0bcb61e7adba26066403388071fdc30d83c65024', text: () => import('./assets-chunks/compte-admin_index_html.mjs').then(m => m.default)},
    'create-test/index.html': {size: 20225, hash: '0e75a7dac3bf8b8fd58d58acadd55d2721e87390284947542960b73e5a0d708d', text: () => import('./assets-chunks/create-test_index_html.mjs').then(m => m.default)},
    'statistique/index.html': {size: 20235, hash: '2b466e9cc7081003ab74de5dfdf11ec50972d9461a0702c754f719fe5853d7d0', text: () => import('./assets-chunks/statistique_index_html.mjs').then(m => m.default)},
    'gestion-professeurs/index.html': {size: 46903, hash: 'ba2f6f58c48b9e76aec8a3c6a08604472d7a61319b1f559086ed891978a82405', text: () => import('./assets-chunks/gestion-professeurs_index_html.mjs').then(m => m.default)},
    'gestion-etudiants/index.html': {size: 44503, hash: '119c9d864fe0c152d0630145885c7d7967dfae0ffdfb1447798058f6203d3560', text: () => import('./assets-chunks/gestion-etudiants_index_html.mjs').then(m => m.default)},
    'test/3/index.html': {size: 7557, hash: 'bcfb5d421b08f854de3c29e72508fc04c7738eac8619ebbac17a6cefdad56750', text: () => import('./assets-chunks/test_3_index_html.mjs').then(m => m.default)},
    'test/2/index.html': {size: 7557, hash: 'bcfb5d421b08f854de3c29e72508fc04c7738eac8619ebbac17a6cefdad56750', text: () => import('./assets-chunks/test_2_index_html.mjs').then(m => m.default)},
    'test/1/index.html': {size: 7557, hash: 'bcfb5d421b08f854de3c29e72508fc04c7738eac8619ebbac17a6cefdad56750', text: () => import('./assets-chunks/test_1_index_html.mjs').then(m => m.default)},
    'tests/index.html': {size: 31004, hash: '171dbaf7e5dbbc7a83d9c29823826737ef1622056e90e28eadc472c9c5a2c90e', text: () => import('./assets-chunks/tests_index_html.mjs').then(m => m.default)},
    'etudiant/index.html': {size: 5637, hash: '7bfbfe402ad436bb15fe633ee75a29ff7bb81658be702a5c30c7f0a5b6593c48', text: () => import('./assets-chunks/etudiant_index_html.mjs').then(m => m.default)},
    'prof/index.html': {size: 5625, hash: 'b9779bdb0ddf4004b61a30b17c8f1ee45b5f90947ba3be70faff50ba6f90c4f5', text: () => import('./assets-chunks/prof_index_html.mjs').then(m => m.default)},
    'styles-G4QRYEUI.css': {size: 73783, hash: 'odmN1VuBvR4', text: () => import('./assets-chunks/styles-G4QRYEUI_css.mjs').then(m => m.default)}
  },
};
