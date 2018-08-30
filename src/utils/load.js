module.exports = new Promise((resolve, reject) => {
    window.onload = resolve;
});
