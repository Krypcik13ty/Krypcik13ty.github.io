'use strict';
const canvas = document.getElementById('webgl-canvas');
let gl = canvas.getContext('webgl2');
const texture_vbo = gl.createBuffer();
export default class ShaderProgram {
    constructor(gl, f_source, v_source, triangle_vertices,  triangle_indices, texture_coordinates, texture) {
        this.texture_coordinates = texture_coordinates
        this.triangle_vertices = triangle_vertices;
        this.triangle_indices = triangle_indices;
        this.v_source = v_source;
        this.f_source = f_source;
        this.texture = texture;
    }
Shade = window.addEventListener('load', () => {
    /* TODO: move shader initialization to a separate function / class and
        then handle potential shader source errors
        (print GLSL error message and then compile basic shader instead)        */

    this.texture.addEventListener('load',
        () => {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }, false);

    const v_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(v_shader, v_source);
    gl.compileShader(v_shader);
    if (!gl.getShaderParameter(v_shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(v_shader));
    }

    const f_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(f_shader, f_source);
    gl.compileShader(f_shader);
    if (!this.gl.getShaderParameter(v_shader, this.gl.COMPILE_STATUS)) {
        throw new Error(this.gl.getShaderInfoLog(f_shader));
    }


    this.gl.attachShader(s_program, v_shader);
    this.gl.attachShader(s_program, f_shader);
    this.gl.linkProgram(s_program);
    if (!this.gl.getProgramParameter(s_program, this.gl.LINK_STATUS)) {
        throw new Error(this.gl.getProgramInfoLog(s_program));
    }
    this.gl.detachShader(s_program, v_shader);
    this.gl.deleteShader(v_shader);
    this.gl.detachShader(s_program, f_shader);
    this.gl.deleteShader(f_shader);


    const triangle_vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(triangle_vao);

    const triangle_vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, triangle_vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.triangle_vertices, this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(0);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texture_vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.texture_coordinates, this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(1);
    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 0, 0);

    const texture_atlas = this.gl.createTexture();
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture_atlas);

    //TODO: create separate texture sampler if possible
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA8, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.texture);


    const triangle_ebo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, triangle_ebo);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.triangle_indices, this.gl.STATIC_DRAW);


    this.gl.bindVertexArray(null);


    /* ----------------------------MAIN-LOOP------------------------------------- */

    //TODO: Handle window resizing in a separate call
    // if (canvas.width !== canvas.clientWidth ||
    //         canvas.height !== canvas.clientHeight)
    //         [canvas.width, canvas.height] =
    //                 [canvas.clientWidth, canvas.clientHeight];
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);


    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(s_program);
    this.gl.bindVertexArray(triangle_vao);

    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
});
}
