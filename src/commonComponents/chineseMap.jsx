import * as d3 from 'd3';
import React from 'react';

import china_map from '../shared/china.json';

export default class ChineseMap extends React.Component {
    componentDidMount() {
        this.mapData = china_map;
        this.mapContainer = this.refs.map;
        this.drawMap()
    }

    render() {
        return (
            <div ref='map' id='map-container' style={{ width: this.props.width, height: this.props.height, position: 'relative' }} ></div>
        )
    }

    drawMap() {
        const { width, height } = this.props;
        this.svgContainer = createSVGContainer("#map-container", width, height);
        let projection = getProjectionFunc(this.mapData, width, height);
        // 把一系列的坐标点转化为路径的函数
        let pathFn = d3.geoPath().projection(projection);
        this.drawDistricts(pathFn);
        // 获取每个地级市的中心点坐标
        this.centerPoints = getCenterPoints(pathFn, this.mapData.features);
        // 标记每个区县的name
        this.markText(".title", { fontSize: 10, fill: "#4172f7", dy: "18" });
        this.markTarget(this.props.coordinate, projection)
    }

    drawDistricts(pathFn) {
        this.svgContainer
            .selectAll('path')
            .data(this.mapData.features)
            .enter()
            .append('path')
            .attr('stroke', '#101b66')
            .attr('stroke-width', 1)
            .attr('fill', (feature) => {
                if(feature.properties.name.includes(this.props.province)) {
                    return '#147efc'
                }
                return '#12379a'
            })
            .attr('d', pathFn)
    }

    markText(className, opts) {
        let { centerPoints } = this;
        this.svgContainer
            .selectAll(className)
            .data(centerPoints)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", opts.fontSize)
            .attr("x", d => d[0])
            .attr("y", d => d[1])
            .attr("stroke", "transparent")
            .attr("fill", opts.fill)
            .text(d => d.name);
    }

    markTarget(coord, projection) {
        var point = document.createElement('span')
        point.classList.add('map-target');
        const proCoord = projection(coord);
        this.mapContainer.appendChild(point)
        const radius = 6;
        Object.assign(point.style, {
            width: `${radius}px`,
            height: `${radius}px`,
            backgroundColor: '#fff',
            left: `${proCoord[0]}px`,
            top: `${proCoord[1]}px`
        })

        this.svgContainer
            .append("text")
            .attr("text-anchor", "left")
            .attr("font-size", 14)
            .attr("x", d => proCoord[0])
            .attr("y", d => proCoord[1])
            .attr('dx', 10)
            .attr('dy', 7)
            .attr("stroke", "transparent")
            .attr("fill", '#fff')
            .text(d => this.props.city);
    }
}

function createSVGContainer(id, width, height) {
    var svg = d3
        .select(id)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("id", id);
    return svg;
}

function getProjectionFunc(root, w, h) {
    var fn = d3
        // .geoEquirectangular()
        .geoMercator()
        .center(getCenters(root.features))
        .scale([w/(2*Math.PI)*5.5])
        .translate([w/2, h/2])
    return fn
}

// 获取一系列区域的总中心点
function getCenters(features) {
    var longitudeMin = 100000; // 最小经度
    var latitudeMin = 100000; // 最小维度
    var longitudeMax = 0; // 最大经度
    var latitudeMax = 0; // 最大纬度
    features.forEach(function(e) {
        var a = d3.geoBounds(e); // [[最小经度，最小维度][最大经度，最大纬度]]
        if (a[0][0] < longitudeMin) {
            longitudeMin = a[0][0];
        }
        if (a[0][1] < latitudeMin) {
            latitudeMin = a[0][1];
        }
        if (a[1][0] > longitudeMax) {
            longitudeMax = a[1][0];
        }
        if (a[1][1] > latitudeMax) {
            latitudeMax = a[1][1];
        }
    });

    var a = (longitudeMax + longitudeMin) / 2;
    var b = (latitudeMax + latitudeMin) / 2;

    return [a, b];
}

function getCenterPoints(path, features) {
    return features.map(feature => {
        var centroid = path.centroid(feature);
        centroid.name = feature.properties.name;
        centroid.adcode = feature.properties.id;
        return centroid;
    });
}