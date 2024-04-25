export function sanitizeHtml(str){
return str. 
replaceAll("&", "&amp;")
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.replaceAll('"', "&quot;")
.replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
.replaceAll("END_QUOTE%", "</div>")
}