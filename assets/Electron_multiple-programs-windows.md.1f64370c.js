import{_ as s,o as n,c as a,O as l}from"./chunks/framework.ef028d7b.js";const u=JSON.parse('{"title":"Different Windows Different Applications","description":"","frontmatter":{},"headers":[],"relativePath":"Electron/multiple-programs-windows.md","filePath":"Electron/multiple-programs-windows.md"}'),e={name:"Electron/multiple-programs-windows.md"},p=l(`<h1 id="different-windows-different-applications" tabindex="-1">Different Windows Different Applications <a class="header-anchor" href="#different-windows-different-applications" aria-label="Permalink to &quot;Different Windows Different Applications&quot;">​</a></h1><h2 id="load-different-applications-in-different-windows-and-package-them-for-use" tabindex="-1">Load different applications in different windows and package them for use <a class="header-anchor" href="#load-different-applications-in-different-windows-and-package-them-for-use" aria-label="Permalink to &quot;Load different applications in different windows and package them for use&quot;">​</a></h2><h2 id="directory-structure" tabindex="-1">Directory Structure <a class="header-anchor" href="#directory-structure" aria-label="Permalink to &quot;Directory Structure&quot;">​</a></h2><div class="language-diff line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">E:.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   .gitignore</span></span>
<span class="line"><span style="color:#A6ACCD;">|   electron-builder.json5</span></span>
<span class="line"><span style="color:#A6ACCD;">|   package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">|   tsconfig.json</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">   vite.config.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">|   vite.node-false.config.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">|   vite.node-true.config.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">|---dist</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   node-false-3a1012ee.js</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   node-true-ed9d4a2a.js</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   __vite-browser-external-d06ac358.js</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |</span></span>
<span class="line"><span style="color:#A6ACCD;">|   +---assets</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |       index-1ce04274.js</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |</span></span>
<span class="line"><span style="color:#A6ACCD;">|   \\---html</span></span>
<span class="line"><span style="color:#A6ACCD;">|           index.html</span></span>
<span class="line"><span style="color:#A6ACCD;">|           node-false.html</span></span>
<span class="line"><span style="color:#A6ACCD;">|           node-true.html</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">|---dist-electron</span></span>
<span class="line"><span style="color:#A6ACCD;">|       main.js</span></span>
<span class="line"><span style="color:#A6ACCD;">|       preload.js</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">|---electron</span></span>
<span class="line"><span style="color:#A6ACCD;">|       electron-env.d.ts</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       main.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">|       preload.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">---html</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       index.html</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       node-false.html</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       node-true.html</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">\\---renderer</span></span>
<span class="line"><span style="color:#A6ACCD;">        index.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">        node-false.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">        node-true.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><h2 id="application-program" tabindex="-1">Application Program <a class="header-anchor" href="#application-program" aria-label="Permalink to &quot;Application Program&quot;">​</a></h2><p>There are three static. <code>.html</code> files under <code>/html</code>, representing three different applications. You can also use other frameworks (vue/react/regular, etc.) to compile pages.</p><h3 id="html" tabindex="-1">html <a class="header-anchor" href="#html" aria-label="Permalink to &quot;html&quot;">​</a></h3><div class="language-diff line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">|---html</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       index.html</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       node-false.html</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       node-true.html</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="electron-program-application-loading" tabindex="-1">Electron Program Application Loading <a class="header-anchor" href="#electron-program-application-loading" aria-label="Permalink to &quot;Electron Program Application Loading&quot;">​</a></h2><h3 id="main-ts" tabindex="-1">main.ts <a class="header-anchor" href="#main-ts" aria-label="Permalink to &quot;main.ts&quot;">​</a></h3><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">BrowserWindow</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">electron</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// index.html</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">BrowserWindow</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">loadURL</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://loaclhost:3000/index.html</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// app-a.html</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">BrowserWindow</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">loadURL</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://loaclhost:3000/app-a.html</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// app-b.html</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">BrowserWindow</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">loadURL</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://loaclhost:3000/app-b.html</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="build-packaging-of-electron-program-applications" tabindex="-1">Build Packaging Of Electron Program Applications <a class="header-anchor" href="#build-packaging-of-electron-program-applications" aria-label="Permalink to &quot;Build Packaging Of Electron Program Applications&quot;">​</a></h2><h3 id="vite-config-ts" tabindex="-1">vite.config.ts <a class="header-anchor" href="#vite-config-ts" aria-label="Permalink to &quot;vite.config.ts&quot;">​</a></h3><div class="language-diff line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { join } from &#39;path&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">export default defineConfig({</span></span>
<span class="line"><span style="color:#A6ACCD;">  // ...other options</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;"> build: {</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">   rollupOptions: {</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">     input: {</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       index: join(__dirname, &#39;index.html&#39;),</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       App_A: join(__dirname, &#39;app-a.html&#39;),</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">       App_B: join(__dirname, &#39;app-b.html&#39;),</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">     },</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">   },</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;"> },</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div>`,14),o=[p];function r(t,i,c,b,d,m){return n(),a("div",null,o)}const C=s(e,[["render",r]]);export{u as __pageData,C as default};
