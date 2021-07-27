import React from 'react';

class ApnCreator extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateOutput = this.updateOutput.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        // this.state = defaultState();
        this.state = {
          start: props.start,
          antal: props.antal,
          apn: props.apn,
          paddingchr: props.paddingchr,
          antaltegn: props.antaltegn,
          output: []
        };
        this.state.output = this.updateOutput(this.state);
      }
    
    
     
    updateFormState(event) {

      // Update form state 
      var t = event.target.name;
      var v = event.target.value;
      // default to 0
      if(t === "paddingchr" && !v) { v = "0" };
      if(t === "antal" || t === "start") { v = parseInt(v) || 0 }
      
      return {...this.state, ...{[t]: v}};
    }

    updateOutput(state) {
      
      // Update output state
      var output = [];

      for(var i = (0+state.start); i < state.start+state.antal; i++) {
        var padding_size = state.antaltegn-(""+i).length;
        padding_size = padding_size <= 0 ? 0 : padding_size;
        //debugger
        var padding = state.paddingchr.repeat(padding_size).slice(0,padding_size);
        var apn = padding + i + state.apn;        
        output.push(apn);
      }
      return output;      
    }
    handleChange(event) {
      var nstate = this.updateFormState(event);
      nstate = {...nstate, ...{output: this.updateOutput(nstate)}}
      this.setState(nstate);
    }
    handleDownload(event) {

      var entries = Object.entries(this.state);
      delete entries.output;
      
      var query = entries
                    .map(([key, value]) => key+"="+encodeURIComponent(value))
                    .join("&");
      
      var href = "/csv?"+query
      var filename = this.state.start+this.state.apn+".csv";
      var links = document.createElement('a');
      document.body.appendChild(links); 
      links.download = filename;
      links.href = href;
      links.click();
      document.body.removeChild(links);
            
    }
    render() {

        return (
          <div className={"wrapper"}> 
            <div className={"simcreator"}>
              <li className={"form-row"}>
                  <label>Start nr: </label>
                  <input name="start" type="text" value={this.state.start} onChange={this.handleChange} />                  
              </li>
              <li className={"form-row"}>
                  <label>Antal: </label>
                  <input name="antal" type="text" value={this.state.antal} onChange={this.handleChange} />
                  </li>
              <li className={"form-row"}>
                <label>APN:</label>
                <input name="apn" type="text" value={this.state.apn} onChange={this.handleChange} />                  
                </li>
                <li className={"form-row"}>
                <label>Antal tegn: </label>
                <input name="antaltegn" type="text" value={this.state.antaltegn} onChange={this.handleChange} />
                </li>
              <li className={"form-row"}>
                <label>Padding tegn: </label>
                <input name="paddingchr" type="text" value={this.state.paddingchr} onChange={this.handleChange} />
                </li>
              <li className={"form-row"}>
                <button onClick={this.handleDownload}>Download CSV</button>
              </li>                        
              </div>
              <div>
                <li className={"form-row"}>
                  <label></label>
                  <textarea className={"simoutput"} value={this.state.output.join("\n")} readOnly/>                    
                </li>
              </div>
          </div>
        )
    }
}

export default ApnCreator;  