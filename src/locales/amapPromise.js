import AMapLoader from '@amap/amap-jsapi-loader';

const amapPromise = AMapLoader.load({
    key: '616520c0be57cfeafc472cf64442ae71',
    version: '2.0',
    plugins: [
        'AMap.Geolocation',
        'AMap.MarkerClusterer',
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.MapType',
        'AMap.PolyEditor',
        'AMap.CircleEditor'
    ],
    AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleInfoWindow', 'misc/PositionPicker']
    }
});

export default amapPromise