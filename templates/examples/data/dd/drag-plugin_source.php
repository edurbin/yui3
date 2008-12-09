<style>
    #demo {
        height: 100px;
        width: 100px;
        border: 1px solid black;
        background-color: #8DD5E7;
        position: relative;
        padding: 7px;
    }
    #demo h2 {
        padding: 0;
        margin: 0;
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 110%;
        color: black;
        font-weight: bold;
        cursor: move;
    }
</style>

<div id="demo"><h2>x</h2>Drag Me</div>

<script>

YUI(<?php echo $yuiConfig ?>).use('dd-plugin', function(Y) {
    var node = Y.get('#demo');
    node.plug(Y.plugin.Drag);
    node.dd.addHandle('h2');
});
</script>
