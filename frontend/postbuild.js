import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticHtmlPath = path.resolve(__dirname, '../src/main/resources/static/index.html');
const jspDir = path.resolve(__dirname, '../src/main/webapp/WEB-INF/jsp');
const jspPath = path.join(jspDir, 'index.jsp');

try {
  if (fs.existsSync(staticHtmlPath)) {
    console.log('Found static index.html. Converting to index.jsp...');
    
    // Read compiled HTML
    let htmlContent = fs.readFileSync(staticHtmlPath, 'utf8');
    
    // JSP Directive header syntax
    const jspDirective = '<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n';
    const jspContent = jspDirective + htmlContent;
    
    // Ensure target directories exist
    if (!fs.existsSync(jspDir)) {
      fs.mkdirSync(jspDir, { recursive: true });
    }
    
    // Write index.jsp
    fs.writeFileSync(jspPath, jspContent, 'utf8');
    console.log(`Successfully compiled JSP to: ${jspPath}`);
    
    // Clean up original HTML file
    fs.unlinkSync(staticHtmlPath);
    console.log('Removed temporary index.html from static resources.');
  } else {
    console.error('Error: index.html not found in static resources folder!');
  }
} catch (error) {
  console.error('Error during postbuild execution:', error);
}
