
function* simGen(state) {
    
    for(var i = (0+state.start); i < state.start+state.antal; i++) {
        var padding_size = state.antaltegn-(""+i).length;
        padding_size = padding_size <= 0 ? 0 : padding_size;
        //debugger
        var padding = state.paddingchr.repeat(padding_size).slice(0,padding_size);
        var sim = padding + i + state.apn;        
            yield sim;
      }
      
}

exports.simGen = simGen;