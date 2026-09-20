import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertHtmlToJsx(html) {
    let jsx = html;
    
    // Replace class= with className=
    jsx = jsx.replace(/class=/g, 'className=');
    // Replace for= with htmlFor=
    jsx = jsx.replace(/for=/g, 'htmlFor=');
    // Fix unclosed tags
    jsx = jsx.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
    jsx = jsx.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
    jsx = jsx.replace(/<br>/g, '<br />');
    jsx = jsx.replace(/<hr>/g, '<hr />');
    
    // Fix inline styles
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const rules = p1.split(';').filter(r => r.trim());
        const styleObj = {};
        rules.forEach(r => {
            const parts = r.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join(':').trim();
                const camelKey = key.replace(/-([a-z])/g, (m, p1) => p1.toUpperCase());
                styleObj[camelKey] = value;
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    jsx = jsx.replace(/onmouseover="([^"]*)"/g, 'onMouseOver={() => {$1}}');
    jsx = jsx.replace(/onmouseout="([^"]*)"/g, 'onMouseOut={() => {$1}}');
    jsx = jsx.replace(/onclick="([^"]*)"/g, 'onClick={() => {$1}}');
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    return jsx;
}

function processFile(filename, outputComponentPath) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        return;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
    if (styleMatch) {
        fs.appendFileSync(path.join(__dirname, 'app', 'globals.css'), styleMatch[1] + '\n');
    }

    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
        let bodyContent = bodyMatch[1];
        
        let externalScripts = [];
        let inlineScripts = [];

        // Extract scripts
        const scriptRegex = /<script([\s\S]*?)>([\s\S]*?)<\/script>/gi;
        let match;
        while ((match = scriptRegex.exec(bodyContent)) !== null) {
            const attrs = match[1];
            const inner = match[2];
            const srcMatch = attrs.match(/src="([^"]+)"/);
            if (srcMatch) {
                externalScripts.push(srcMatch[1]);
            } else if (inner.trim()) {
                inlineScripts.push(inner);
            }
        }

        // Remove script tags from body
        bodyContent = bodyContent.replace(scriptRegex, '');
        let jsx = convertHtmlToJsx(bodyContent);

        const externalScriptTags = externalScripts.map(src => `<Script src="${src}" strategy="lazyOnload" />`).join('\n            ');
        
        const escapedInlineScripts = inlineScripts.join('\n\n').replace(/`/g, '\\`').replace(/\$/g, '\\$');

        const componentCode = `
"use client";
import { useEffect } from 'react';
import Script from 'next/script';

export default function Page() {
    useEffect(() => {
        // Wait a bit for external scripts (GSAP) to load if they are not already loaded
        const initScripts = () => {
            try {
                ${inlineScripts.join('\n\n')}
            } catch(e) {
                console.error(e);
            }
        };
        
        // Give time for GSAP to be available
        setTimeout(initScripts, 500);
    }, []);

    return (
        <>
            ${externalScriptTags}
            ${jsx}
        </>
    );
}
`;
        fs.mkdirSync(path.dirname(path.join(__dirname, outputComponentPath)), { recursive: true });
        fs.writeFileSync(path.join(__dirname, outputComponentPath), componentCode);
    }
}

function main() {
    fs.mkdirSync(path.join(__dirname, 'app'), { recursive: true });
    fs.writeFileSync(path.join(__dirname, 'app', 'globals.css'), '');

    processFile('index.html', 'app/page.tsx');
    processFile('creators.html', 'app/creators/page.tsx');

    const publicAssetsDir = path.join(__dirname, 'public', 'assets');
    const sourceAssetsDir = path.join(__dirname, 'assets');
    
    if (fs.existsSync(sourceAssetsDir)) {
        fs.mkdirSync(path.dirname(publicAssetsDir), { recursive: true });
        fs.renameSync(sourceAssetsDir, publicAssetsDir);
    }
}

main();
