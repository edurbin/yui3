YUI.add("selection",function(B){var A="textContent",D="innerHTML",C="fontFamily";if(B.UA.ie){A="nodeValue";}B.Selection=function(J){var K,I,E,G,F,H;if(B.config.win.getSelection){K=B.config.win.getSelection();}else{if(B.config.doc.selection){K=B.config.doc.selection.createRange();}}this._selection=K;if(K.pasteHTML){this.isCollapsed=(K.compareEndPoints("StartToEnd",K))?false:true;if(this.isCollapsed){this.anchorNode=this.focusNode=B.one(K.parentElement());if(J){E=B.config.doc.elementFromPoint(J.clientX,J.clientY);}if(!E){I=K.parentElement();G=I.childNodes;F=K.duplicate();for(H=0;H<G.length;H++){if(F.inRange(K)){E=G[H];}}}this.ieNode=E;if(E){if(E.nodeType!==3){if(E.firstChild){E=E.firstChild;}}this.anchorNode=this.focusNode=B.Selection.resolve(E);this.anchorOffset=this.focusOffset=(this.anchorNode.nodeValue)?this.anchorNode.nodeValue.length:0;this.anchorTextNode=this.focusTextNode=B.one(E);}}}else{this.isCollapsed=K.isCollapsed;this.anchorNode=B.Selection.resolve(K.anchorNode);this.focusNode=B.Selection.resolve(K.focusNode);this.anchorOffset=K.anchorOffset;this.focusOffset=K.focusOffset;this.anchorTextNode=B.one(K.anchorNode);this.focusTextNode=B.one(K.focusNode);}if(B.Lang.isString(K.text)){this.text=K.text;}else{if(K.toString){this.text=K.toString();}else{this.text="";}}};B.Selection.filter=function(E){var H=(new Date()).getTime();var G=B.all(B.Selection.ALL),K=B.all("strong,em"),N=B.config.doc,P=N.getElementsByTagName("hr"),F={},I="",L;var J=(new Date()).getTime();G.each(function(R){var Q=B.Node.getDOMNode(R);if(Q.style[C]){F["."+R._yuid]=Q.style[C];R.addClass(R._yuid);Q.style[C]="inherit";Q.removeAttribute("face");if(Q.getAttribute("style")===""){Q.removeAttribute("style");}if(Q.getAttribute("style")){if(Q.getAttribute("style").toLowerCase()==="font-family: "){Q.removeAttribute("style");}}}});var O=(new Date()).getTime();B.each(P,function(R){var Q=N.createElement("div");Q.className="hr";Q.setAttribute("style","border: 1px solid #ccc; line-height: 0; font-size: 0;margin-top: 5px; margin-bottom: 5px;");Q.setAttribute("readonly",true);Q.setAttribute("contenteditable",false);if(R.parentNode){R.parentNode.replaceChild(Q,R);}});B.each(F,function(R,Q){I+=Q+" { font-family: "+R.replace(/"/gi,"")+"; }";});B.StyleSheet(I,"editor");K.each(function(T,Q){var R=T.get("tagName").toLowerCase(),S="i";if(R==="strong"){S="b";}B.Selection.prototype._swap(K.item(Q),S);});L=B.all("ol,ul");L.each(function(R,Q){var S=R.all("li");if(!S.size()){R.remove();}});if(E){B.Selection.filterBlocks();}var M=(new Date()).getTime();};B.Selection.filterBlocks=function(){var F=(new Date()).getTime();var M=B.config.doc.body.childNodes,H,G,P=false,J=true,E,Q,R,O,L,N,S;if(M){for(H=0;H<M.length;H++){G=B.one(M[H]);if(!G.test(B.Selection.BLOCKS)){J=true;if(M[H].nodeType==3){N=M[H][A].match(B.Selection.REG_CHAR);S=M[H][A].match(B.Selection.REG_NON);if(N===null&&S){J=false;}}if(J){if(!P){P=[];}P.push(M[H]);}}else{P=B.Selection._wrapBlock(P);}}P=B.Selection._wrapBlock(P);}Q=B.all("p");if(Q.size()===1){R=Q.item(0).all("br");if(R.size()===1){R.item(0).remove();var I=Q.item(0).get("innerHTML");if(I==""||I==" "){Q.set("innerHTML",B.Selection.CURSOR);E=new B.Selection();E.focusCursor(true,true);}}}else{Q.each(function(U){var T=U.get("innerHTML");if(T===""){U.remove();}});}if(!B.UA.ie){O=B.all("div, p");O.each(function(U){var T=U.get("innerHTML");if(T===""){U.remove();}else{if(U.get("childNodes").size()==1){if(U.ancestor("p")){U.replace(U.get("firstChild"));}}}});L=B.all(".Apple-style-span, .apple-style-span");L.each(function(T){T.setAttribute("style","");});}var K=(new Date()).getTime();};B.Selection.REG_CHAR=/[a-zA-Z-0-9_]/gi;B.Selection.REG_NON=/[\s\S|\n|\t]/gi;B.Selection._wrapBlock=function(F){if(F){var E=B.Node.create("<p></p>"),H=B.one(F[0]),G;for(G=1;G<F.length;G++){E.append(F[G]);}H.replace(E);E.prepend(H);}return false;};B.Selection.unfilter=function(){var F=B.all("body [class]"),G="",E,H;F.each(function(I){if(I.hasClass(I._yuid)){I.setStyle(C,I.getStyle(C));I.removeClass(I._yuid);if(I.getAttribute("class")===""){I.removeAttribute("class");}}});E=B.all(".yui-non");E.each(function(I){if(I.get("innerHTML")===""){I.remove();}else{I.removeClass("yui-non");}});H=B.all("body [id]");H.each(function(I){if(I.get("id").indexOf("yui_3_")===0){I.removeAttribute("id");I.removeAttribute("_yuid");}});G=B.one("body").get("innerHTML");F.each(function(I){I.addClass(I._yuid);I.setStyle(C,"");if(I.getAttribute("style")===""){I.removeAttribute("style");}});return G;};B.Selection.resolve=function(E){if(E&&E.nodeType===3){E=E.parentNode;}return B.one(E);};B.Selection.getText=function(G){var E=G.get("innerHTML").replace(B.Selection.STRIP_HTML,""),H=E.match(B.Selection.REG_CHAR),F=E.match(B.Selection.REG_NON);if(H===null&&F){E="";}return E;};B.Selection.ALL="[style],font[face]";B.Selection.STRIP_HTML=/<\S[^><]*>/g;B.Selection.BLOCKS="p,div,ul,ol,table,style";B.Selection.TMP="yui-tmp";B.Selection.DEFAULT_TAG="span";B.Selection.CURID="yui-cursor";B.Selection.CUR_WRAPID="yui-cursor-wrapper";B.Selection.CURSOR='<span id="'+B.Selection.CURID+'"><span id="'+B.Selection.CUR_WRAPID+'">&nbsp;</span></span>';B.Selection.cleanCursor=function(){var E=B.all("#"+B.Selection.CUR_WRAPID);if(E.size){E.each(function(G){var F=G.get("innerHTML");if(F=="&nbsp"||F=="<br>"){G.remove();}});}};B.Selection.prototype={text:null,isCollapsed:null,anchorNode:null,anchorOffset:null,anchorTextNode:null,focusNode:null,focusOffset:null,focusTextNode:null,_selection:null,_wrap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.set(D,"");G.append(F);return B.Node.getDOMNode(F);},_swap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.replace(F,G);return B.Node.getDOMNode(F);},getSelected:function(){B.Selection.filter();B.config.doc.execCommand("fontname",null,B.Selection.TMP);var F=B.all(B.Selection.ALL),E=[];F.each(function(H,G){if(H.getStyle(C,B.Selection.TMP)){H.setStyle(C,"");H.removeAttribute("face");if(H.getAttribute("style")===""){H.removeAttribute("style");
}if(!H.test("body")){E.push(B.Node.getDOMNode(F.item(G)));}}});return B.all(E);},insertContent:function(E){return this.insertAtCursor(E,this.anchorTextNode,this.anchorOffset,true);},insertAtCursor:function(K,F,H,N){var P=B.Node.create("<"+B.Selection.DEFAULT_TAG+' class="yui-non"></'+B.Selection.DEFAULT_TAG+">"),E,I,G,O,J=this.createRange(),M;if(F&&F.test("body")){M=B.Node.create("<span></span>");F.append(M);F=M;}if(J.pasteHTML){O=B.Node.create(K);try{J.pasteHTML('<span id="rte-insert"></span>');}catch(L){}E=B.one("#rte-insert");if(E){E.set("id","");E.replace(O);return O;}else{B.on("available",function(){E.set("id","");E.replace(O);},"#rte-insert");}}else{if(H>0){E=F.get(A);I=B.one(B.config.doc.createTextNode(E.substr(0,H)));G=B.one(B.config.doc.createTextNode(E.substr(H)));F.replace(I,F);O=B.Node.create(K);if(O.get("nodeType")===11){M=B.Node.create("<span></span>");M.append(O);O=M;}I.insert(O,"after");if(G){O.insert(P,"after");P.insert(G,"after");this.selectNode(P,N);}}else{if(F.get("nodeType")===3){F=F.get("parentNode");}O=B.Node.create(K);K=F.get("innerHTML");if(K==""||K=="<br>"){F.append(O);}else{F.insert(O,"before");}}}return O;},wrapContent:function(F){F=(F)?F:B.Selection.DEFAULT_TAG;if(!this.isCollapsed){var H=this.getSelected(),K=[],G,I,J,E;H.each(function(N,L){var M=N.get("tagName").toLowerCase();if(M==="font"){K.push(this._swap(H.item(L),F));}else{K.push(this._wrap(H.item(L),F));}},this);G=this.createRange();J=K[0];I=K[K.length-1];if(this._selection.removeAllRanges){G.setStart(K[0],0);G.setEnd(I,I.childNodes.length);this._selection.removeAllRanges();this._selection.addRange(G);}else{G.moveToElementText(B.Node.getDOMNode(J));E=this.createRange();E.moveToElementText(B.Node.getDOMNode(I));G.setEndPoint("EndToEnd",E);G.select();}K=B.all(K);return K;}else{return B.all([]);}},replace:function(K,I){var F=this.createRange(),J,E,G,H;if(F.getBookmark){G=F.getBookmark();E=this.anchorNode.get("innerHTML").replace(K,I);this.anchorNode.set("innerHTML",E);F.moveToBookmark(G);H=B.one(F.parentElement());}else{J=this.anchorTextNode;E=J.get(A);G=E.indexOf(K);E=E.replace(K,"");J.set(A,E);H=this.insertAtCursor(I,J,G,true);}return H;},remove:function(){this._selection.removeAllRanges();return this;},createRange:function(){if(B.config.doc.selection){return B.config.doc.selection.createRange();}else{return B.config.doc.createRange();}},selectNode:function(H,J,E){E=E||0;H=B.Node.getDOMNode(H);var F=this.createRange();if(F.selectNode){F.selectNode(H);this._selection.removeAllRanges();this._selection.addRange(F);if(J){try{this._selection.collapse(H,E);}catch(G){this._selection.collapse(H,0);}}}else{if(H.nodeType===3){H=H.parentNode;}try{F.moveToElementText(H);}catch(I){}if(J){F.collapse(((E)?false:true));}F.select();}return this;},setCursor:function(){this.removeCursor(false);return this.insertContent(B.Selection.CURSOR);},getCursor:function(){return B.all("#"+B.Selection.CURID);},removeCursor:function(E){var F=this.getCursor();if(F){if(E){F.removeAttribute("id");F.set("innerHTML",'<span id="'+B.Selection.CUR_WRAPID+'">&nbsp;</span>');}else{F.remove();}}return F;},focusCursor:function(G,E){if(G!==false){G=true;}if(E!==false){E=true;}var F=this.removeCursor(true);if(F){F.each(function(H){this.selectNode(H,G,E);},this);}},toString:function(){return"Selection Object";}};},"@VERSION@",{requires:["node"],skinnable:false});