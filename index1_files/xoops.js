
function XoopsUtility() {
    this.url = '';
    
    
    this.addElementClass = function (  elt, cls ) {
        var current = " " + elt.className + " ";
        if ( current.indexOf( " " + cls + " " ) == -1 ) {
            elt.className += elt.className ? ( " " + cls ) : cls;
        }
    }
    this.removeElementClass = function ( elt, cls ) {
        var current = " " + elt.className + " ";
        var nClass = current.replace( new RegExp( " " + cls + " " ), " " );
        elt.className = nClass.substr( 1, nClass.length - 2 );
    }
    this.replaceElementClass = function( elt, cls1, cls2 ) {
        var current = " " + elt.className + " ";
        var nClass = current.replace( new RegExp( " " + cls1 + " " ), " " + cls2 + " " );
        elt.className = nClass.substr( 1, nClass.length - 2 );
    }

}

var xoops = new XoopsUtility();
