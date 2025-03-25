function AlignmentPattern(t,e,i){this.x=t,this.y=e,this.count=1,this.estimatedModuleSize=i,this.__defineGetter__("EstimatedModuleSize",(function(){return this.estimatedModuleSize})),this.__defineGetter__("Count",(function(){return this.count})),this.__defineGetter__("X",(function(){return Math.floor(this.x)})),this.__defineGetter__("Y",(function(){return Math.floor(this.y)})),this.incrementCount=function(){this.count++},this.aboutEquals=function(t,e,i){if(Math.abs(e-this.y)<=t&&Math.abs(i-this.x)<=t){var r=Math.abs(t-this.estimatedModuleSize);return r<=1||r/this.estimatedModuleSize<=1}return!1}}function AlignmentPatternFinder(t,e,i,r,n,s,h){this.image=t,this.possibleCenters=new Array,this.startX=e,this.startY=i,this.width=r,this.height=n,this.moduleSize=s,this.crossCheckStateCount=new Array(0,0,0),this.resultPointCallback=h,this.centerFromEnd=function(t,e){return e-t[2]-t[1]/2},this.foundPatternCross=function(t){for(var e=this.moduleSize,i=e/2,r=0;r<3;r++)if(Math.abs(e-t[r])>=i)return!1;return!0},this.crossCheckVertical=function(t,e,i,r){var n=this.image,s=qrcode.height,h=this.crossCheckStateCount;h[0]=0,h[1]=0,h[2]=0;for(var o=t;o>=0&&n[e+o*qrcode.width]&&h[1]<=i;)h[1]++,o--;if(o<0||h[1]>i)return NaN;for(;o>=0&&!n[e+o*qrcode.width]&&h[0]<=i;)h[0]++,o--;if(h[0]>i)return NaN;for(o=t+1;o<s&&n[e+o*qrcode.width]&&h[1]<=i;)h[1]++,o++;if(o==s||h[1]>i)return NaN;for(;o<s&&!n[e+o*qrcode.width]&&h[2]<=i;)h[2]++,o++;if(h[2]>i)return NaN;var a=h[0]+h[1]+h[2];return 5*Math.abs(a-r)>=2*r?NaN:this.foundPatternCross(h)?this.centerFromEnd(h,o):NaN},this.handlePossibleCenter=function(t,e,i){var r=t[0]+t[1]+t[2],n=this.centerFromEnd(t,i),s=this.crossCheckVertical(e,Math.floor(n),2*t[1],r);if(!isNaN(s)){for(var h=(t[0]+t[1]+t[2])/3,o=this.possibleCenters.length,a=0;a<o;a++){if(this.possibleCenters[a].aboutEquals(h,s,n))return new AlignmentPattern(n,s,h)}var u=new AlignmentPattern(n,s,h);this.possibleCenters.push(u),null!=this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(u)}return null},this.find=function(){for(var e=this.startX,n=this.height,s=e+r,h=i+(n>>1),o=new Array(0,0,0),a=0;a<n;a++){var u=h+(0==(1&a)?a+1>>1:-(a+1>>1));o[0]=0,o[1]=0,o[2]=0;for(var l=e;l<s&&!t[l+qrcode.width*u];)l++;for(var f=0;l<s;){if(t[l+u*qrcode.width])if(1==f)o[f]++;else if(2==f){var d;if(this.foundPatternCross(o))if(null!=(d=this.handlePossibleCenter(o,u,l)))return d;o[0]=o[2],o[1]=1,o[2]=0,f=1}else o[++f]++;else 1==f&&f++,o[f]++;l++}if(this.foundPatternCross(o))if(null!=(d=this.handlePossibleCenter(o,u,s)))return d}if(0!=this.possibleCenters.length)return this.possibleCenters[0];throw"Couldn't find enough alignment patterns"}}