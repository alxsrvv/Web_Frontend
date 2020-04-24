function wiggle_string(wiggle_it) {
    let arr = [];
    len = wiggle_it.length;
    arr.push(wiggle_it)
    for (let i = 0; i < len; i++)
    {
        wiggle_it = ' ' + wiggle_it;
        arr.push(wiggle_it)
    }
    for (let i = 0; i < len; i++)
    {
        wiggle_it = wiggle_it.slice(1);
        arr.push(wiggle_it)
    }
    return arr
}

var X = wiggle_string('>>>>');
for (var i of X) {
    console.log(i)
}