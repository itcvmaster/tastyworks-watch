<script>
    // @ts-nocheck
    import { calcScale } from "$lib/utils";

    export let points = [{x: 0, y: 0}];
    export let xTicksCount = 5;
    export let yTicksCount = 5;
    let xTicks = [];
    let yTicks = [];
    const padding = { top: 20, right: 15, bottom: 20, left: 25 };

    let width = 500;
    let height = 200;

    $: xPoints = points.map(point => point.x);
    $: yPoints = points.map(point => point.y);
    $: average = yPoints.reduce((a, b) => a + b, 0) / (yPoints.length || 1);
    $: minX = Math.min(...xPoints);
    $: maxX = Math.max(...xPoints);
    $: minY = Math.min(...yPoints);
    $: maxY = Math.max(...yPoints);
    $: xScale = calcScale([minX, maxX], [padding.left, width - padding.right]);
    $: yScale = calcScale([minY, maxY], [height - padding.bottom, padding.top]);
    $: path = `M${points.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join("L")}`;
    $: area = `${path}L${xScale(maxX)},${yScale(minY)}L${xScale(minX)},${yScale(minY)}Z`;
    $: xTicks = Array.from(Array(xTicksCount).keys()).map((tick) => Math.round((maxX-minX) * tick/4 + minX));
    $: yTicks = Array.from(Array(yTicksCount).keys()).map((tick) => ((maxY-minY) * tick/4 + minY).toFixed(2));

    function format(tick) {
        return new Date(tick).toISOString().substring(0, 10);
    }
</script>

<h1>History Quote Chart</h1>

{#if points.length > 0}
<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
    <svg>
        <!-- y axis -->
        <g class="axis y-axis" transform="translate(0, {padding.top})">
            {#each yTicks as tick}
                <g
                    class="tick tick-{tick}"
                    transform="translate(0, {yScale(tick) - padding.bottom})"
                >
                    <line x2="100%" />
                    <text y="-4">{tick}</text>
                </g>
            {/each}
        </g>
        <!-- average line -->
        <g class="axis y-axis" transform="translate(0, {padding.top})">
            <g transform="translate(0, {yScale(average) - padding.bottom})">
                <line class="tick-average" x2="100%" />
            </g>
        </g>
        

        <!-- x axis -->
        <g class="axis x-axis">
            {#each xTicks as tick}
                <g
                    class="tick tick-{tick}"
                    transform="translate({xScale(tick)},{height})"
                >
                    <line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0" />
                    <text y="-2">{format(tick)}</text
                    >
                </g>
            {/each}
        </g>

        <!-- data -->
        <path class="path-area" d={area} />
        <path class="path-line" d={path} />
    </svg>
</div>
{/if}

<style>
    .chart,
    p {
        width: 100%;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
    }

    svg {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: visible;
    }

    .tick {
        font-size: 0.725em;
        font-weight: 200;
    }

    .tick line {
        stroke: #aaa;
        stroke-dasharray: 2;
    }

    .tick text {
        fill: #666;
        text-anchor: start;
    }

    .tick-average {
        stroke: red;
        stroke-dasharray: 5;
        stroke-width: 2;
    }

    .tick.tick-0 line {
        stroke-dasharray: 0;
    }

    .x-axis .tick text {
        text-anchor: middle;
    }

    .path-line {
        fill: none;
        stroke: rgb(0, 100, 100);
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 2;
    }

    .path-area {
        fill: rgba(0, 100, 100, 0.2);
    }
</style>

