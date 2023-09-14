exports.unEscape = (val) => {
    val = val.replace(/&lt;/g, "<");
    val = val.replace(/&gt;/g, ">");
    val = val.replace(/&quot;/g, '"');
    val = val.replace(/&#x27;/g, "'");
    val = val.replace(/&amp;/g, "&");
    val = val.replace(/&#x2F;/g, '/');
  return val;
}

