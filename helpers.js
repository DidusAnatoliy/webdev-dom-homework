
export function sanitize(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
        .replaceAll("END_QUOTE%", "</div>")
}

export function normalizeComments(comments) {
    return comments.map((comment) => {
        return {
            name: comment.author.name,
            time: new Date(comment.date).toLocaleString(),
            comment: comment.text,
            likes: comment.likes,
            isLiked: false,
        }
    });
}
