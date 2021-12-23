function thousandsFormat(num){
    return num.toString().replace(/\d+/, function(m){
        return m.replace(/(\d)(?=(\d{3})+$)/g, function(n){
            return n+','
        })
    })
}

console.log(thousandsFormat(100000000.3432))