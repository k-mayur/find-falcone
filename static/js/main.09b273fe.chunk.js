(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{42:function(e,t,n){e.exports=n(90)},47:function(e,t,n){},48:function(e,t,n){},57:function(e,t,n){},77:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(20),r=n.n(l),o=(n(47),n(9)),i=n(10),s=n(13),u=n(11),p=n(12),d=n(26),m=n(15),h=(n(48),function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"header"},c.a.createElement("div",{className:"header-text"},c.a.createElement("h2",null,"Finding ",this.props.name)),c.a.createElement("div",{className:"header-btn"},c.a.createElement(d.b,{to:"/"},c.a.createElement("button",{"data-test":"homeBtn",className:"btn"},"Home"))))}}]),t}(c.a.Component)),f=Object(m.e)(h),v=(n(57),function(e){return c.a.createElement("div",{className:"footer"},c.a.createElement("h4",null,"Coding problem"," ",c.a.createElement("a",{"data-test":"footerLink",href:"https://www.geektrust.in/"},"geektrust.in/finding-falcone")," "))}),E=function(e){return c.a.createElement("div",null,"invalid address")},b=n(14),g=n(17),y=n(18),O=n.n(y),j=n(41),k=n(6),T=function(e,t){return Object(k.a)({},e,t,{loading:!1})},N={planets:[],result:{},redirect:!1,loding:!1},S=function(e,t){return Object(k.a)({},e,{result:t,redirect:!0,loading:!1})},w={vehicles:[],updatedVehicles:[],time:0},_=function(e,t){var n=Object.assign({},e),a={};t.selectedV.forEach(function(e){void 0!==e&&(a[e]?a[e]++:a[e]=1)}),console.log(a,n.vehicles);var c=n.vehicles.map(function(e){return Object.assign({},e)});console.log(c);var l=c.map(function(e){return a[e.name]&&(e.total_no=e.total_no-a[e.name]),e});console.log(l);var r=t.selectedV.map(function(e,a){return void 0!==e?t.planets.filter(function(e){return e.name===t.selectedP[a]})[0].distance/n.vehicles.filter(function(t){return t.name===e})[0].speed:null}).reduce(function(e,t){return e+t});return Object(k.a)({},e,{updatedVehicles:l,time:r})},I=n(16),V=Object(I.c)({planet:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_PLANETS":return T(e,{planets:t.payload});case"FIND_RESULT":return S(e,t.payload);case"RESET_REDIRECT":return Object(k.a)({},e,{redirect:!1});case"RESET":return Object(k.a)({},e,{result:{},redirect:!1});case"LOADING":return Object(k.a)({},e,{loading:!0});default:return e}},vehicle:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_VEHICLES":return T(e,{vehicles:t.payload,updatedVehicles:t.payload});case"UPDATE_TIME":return _(e,t.payload);case"RESET_TIME":return Object(k.a)({},e,{time:0});case"RESET":return Object(k.a)({},e,{updatedVehicles:e.vehicles,time:0});default:return e}}}),C=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||I.d,A=Object(I.e)(V,C(Object(I.a)(j.a))),P=(n(77),n(23)),R=n.n(P),D=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={planet1:"",planet2:"",planet3:"",planet4:"",vehicle1:void 0,vehicle2:void 0,vehicle3:void 0,vehicle4:void 0},n.resetHandle=function(){[1,2,3,4].forEach(function(e){var t;document.getElementById("d".concat(e)).innerHTML="",n.setState((t={},Object(b.a)(t,"planet".concat(e),""),Object(b.a)(t,"vehicle".concat(e),void 0),t))}),n.props.resetHandler()},n.findHandle=function(e){if(e.preventDefault(),Object.values(n.state).includes("")||Object.values(n.state).includes(void 0))R()(c.a.createElement("div",null,c.a.createElement("h1",null,"Inputs Missing!"),c.a.createElement("p",null,"Please enter all valid inputs.")));else{var t=[],a=[];[1,2,3,4].forEach(function(e){t.push(n.state["planet".concat(e)]),a.push(n.state["vehicle".concat(e)])}),n.props.loadingOn(),n.props.findHandler(t,a)}},n.selectedPlanets=function(e){var t=[1,2,3,4];return(t=t.filter(function(t){return t!==e})).map(function(e){var t=document.getElementById("s".concat(e));return t.options[t.selectedIndex].value})},n.selectedVehicles=function(e){var t=[1,2,3,4];return(t=t.filter(function(t){return t!==e})).map(function(e){var t=document.querySelector('input[name = "'.concat(e,'"]:checked'));return null!==t?t.value:void 0})},n.populateVehicles=function(e,t){var a=t.target.value,l="";""!==a&&(n.selectedPlanets(e).includes(a)?(t.target.value=n.state["planet".concat(e)],R()(c.a.createElement("div",null,c.a.createElement("h1",null,"Planet Already Selected!"),c.a.createElement("p",null,"Please select another planet. ")))):l=n.props.planet.planets.filter(function(e){return e.name===a})[0].distance);""!==l&&n.props.vehicle.vehicles.map(function(t){return t.max_distance>=l?document.getElementById("d".concat(e)).innerHTML+='<span><input type="radio" id="'+t.name+e+'" name="'+e+'" value="'+t.name+'" /><label for="'+t.name+e+'">'+t.name+"</label></span>":null}),n.setState(Object(b.a)({},"planet".concat(e),t.target.value))},n.radioClick=function(e){var t=e.target.value,a=e.target.name;if(void 0!==t){if(n.props.vehicle.updatedVehicles.filter(function(e){return e.name===t})[0].total_no<=0)return null!==document.querySelector('input[name = "'.concat(a,'"]:checked'))&&void 0!==n.state["vehicle".concat(a)]?(document.getElementById("".concat(n.state["vehicle".concat(a)]).concat(a)).checked=!0,void R()(c.a.createElement("div",null,c.a.createElement("h1",null,"Vehicle Not Available! "),c.a.createElement("p",null,"Please select another vehicle.")))):(document.getElementById("".concat(t).concat(a)).checked=!1,R()(c.a.createElement("div",null,c.a.createElement("h1",null,"Vehicle Not Available! "),c.a.createElement("p",null,"Please select another vehicle."))),void n.setState(Object(b.a)({},"vehicle".concat(a),void 0)));var l=n.selectedVehicles(a),r=n.selectedPlanets(a);n.props.updateTimeAndCount(r,l),n.setState(Object(b.a)({},"vehicle".concat(a),t))}},n.getData=function(){n.props.getPlanets(),n.props.getVehicles()},n.componentDidMount=function(){n.props.loadingOn(),n.getData()},n.componentDidUpdate=function(){!0===n.props.planet.redirect&&n.props.history.push("/result")},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.planet,n=t.planets;if(t.loading)return c.a.createElement("div",null,c.a.createElement("div",{className:"loader"},"Loading..."));var a=n.map(function(e,t){return c.a.createElement("option",{key:t,value:e.name},e.name)}),l=[1,2,3,4].map(function(t){var n="s".concat(t),l="d".concat(t);return c.a.createElement("div",{key:t,className:"planet-wrap"},c.a.createElement("select",{className:"planet-dropdown",onChange:function(n){return e.populateVehicles(t,n)},id:n,value:e.state["planet".concat(t)]},c.a.createElement("option",{value:""},"select planet ",t),a),c.a.createElement("div",{className:"planet-vehicles",id:l,onClick:e.radioClick}))}),r=this.props.vehicle.updatedVehicles.map(function(e,t){return c.a.createElement("span",{key:t},e.name," :"," ",c.a.createElement("span",{style:{color:"darkred",fontSize:"1.2em"}},e.total_no)," ","\xa0")});return c.a.createElement("div",{className:"home"},c.a.createElement("div",{className:"home-options"},c.a.createElement("h4",{style:{textAlign:"center"}},"Select planets you want to search in :"),c.a.createElement("div",{className:"vlist"},c.a.createElement("span",{className:"vlist-title"},"Available Vehicles :"),c.a.createElement("div",{className:"vlist-content"},r)),c.a.createElement("form",{className:"home-form","data-test":"findForm",onSubmit:this.findHandle},c.a.createElement("span",{className:"planets-wrap"},l),c.a.createElement("button",{className:"btn",type:"submit",style:{alignSelf:"center",margin:"30px"}},"Find Falcone")),c.a.createElement("button",{"data-test":"resetBtn",className:"btn pos-abs",onClick:this.resetHandle},"Reset")),c.a.createElement("div",{className:"home-time"},c.a.createElement("h4",null,"Time taken :"," ",c.a.createElement("span",{style:{color:"darkred"}},this.props.vehicle.time)," ")))}}]),t}(c.a.Component),H=Object(g.b)(function(e){return{vehicle:e.vehicle,planet:e.planet}},{findHandler:function(e,t){return function(n){O.a.post("https://findfalcone.herokuapp.com/token",null,{headers:{Accept:"application/json"}}).then(function(a){var c={token:a.data.token,planet_names:e,vehicle_names:t};O.a.post("https://findfalcone.herokuapp.com/find",c,{headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){n({type:"FIND_RESULT",payload:e.data})}).catch(function(e){return console.log(e)})}).catch(function(e){return console.log(e)})}},getPlanets:function(){return function(e){O.a.get("https://findfalcone.herokuapp.com/planets").then(function(t){e({type:"GET_PLANETS",payload:t.data})}).catch(function(e){return console.log(e)})}},getVehicles:function(){return function(e){O.a.get("https://findfalcone.herokuapp.com/vehicles").then(function(t){e({type:"GET_VEHICLES",payload:t.data})}).catch(function(e){return console.log(e)})}},updateTimeAndCount:function(e,t){return function(n){var a=A.getState().planet.planets;n({type:"UPDATE_TIME",payload:{selectedP:e,selectedV:t,planets:a}})}},resetHandler:function(){return function(e){e({type:"RESET"})}},loadingOn:function(){return function(e){e({type:"LOADING"})}}})(D),L=(n(88),function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentWillUnmount",value:function(){this.props.resetRedirect()}},{key:"render",value:function(){var e=this,t="Falcone was not found on any of the planet you selected.",n="She could be anywhere on the remaining planet.";return"success"===this.props.planet.result.status&&(t="Congratulations! You found Falcone. King Shan is mighty pleased.",n="She was hiding on ".concat(this.props.planet.result.planet_name,".")),c.a.createElement("div",{className:"result"},c.a.createElement("h3",null,t),c.a.createElement("p",null,n),c.a.createElement("p",null,"Time taken : ",this.props.vehicle.time),c.a.createElement("button",{className:"btn",onClick:function(){e.props.history.push("/")}},"Try Again"))}}]),t}(c.a.Component)),B=Object(g.b)(function(e){return{vehicle:e.vehicle,planet:e.planet}},{resetRedirect:function(){return function(e){e({type:"RESET_REDIRECT"}),e({type:"RESET_TIME"})}}})(L),F=(n(89),function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,c=new Array(a),l=0;l<a;l++)c[l]=arguments[l];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={name:"Falcone"},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(d.a,null,c.a.createElement(f,{name:this.state.name}),c.a.createElement(m.c,null,c.a.createElement(m.a,{path:"/",component:H,exact:!0}),c.a.createElement(m.a,{path:"/result",component:B,exact:!0}),c.a.createElement(m.a,{component:E})),c.a.createElement(v,null)))}}]),t}(c.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(g.a,{store:A},c.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[42,1,2]]]);
//# sourceMappingURL=main.09b273fe.chunk.js.map