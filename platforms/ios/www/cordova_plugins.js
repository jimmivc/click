cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-estimote.EstimoteBeacons",
        "file": "plugins/cordova-plugin-estimote/plugin/src/js/EstimoteBeacons.js",
        "pluginId": "cordova-plugin-estimote",
        "clobbers": [
            "estimote"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-estimote": "0.8.0",
    "cordova-plugin-whitelist": "1.2.2"
};
// BOTTOM OF METADATA
});