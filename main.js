'use strict';

/* -----------------------------WINDOW-DRAG---------------------------------- */
let active = false;
let curr_x;
let curr_y;
let init_x;
let init_y;
let off_x = 0;
let off_y = 0;

let wnd = document.querySelector('div.window');
/* FIXME: not working as intended */
// let wnd_bar = document.querySelector('.title-bar');

wnd.addEventListener('mousedown',
        evt => {
                [init_x, init_y, active] = [evt.clientX - off_x, evt.clientY - off_y, true];
        }
        , false);
wnd.addEventListener('mouseup',
        () => {
                [init_x, init_y, active] = [curr_x, curr_y, false];
        }, false);
wnd.addEventListener('mousemove',
        evt => {
                if (active) {
                        evt.preventDefault();
                        [curr_x, curr_y, off_x, off_y] = [
                                evt.clientX - init_x,
                                evt.clientY - init_y,
                                curr_x,
                                curr_y];

                        wnd.style.transform = `
                        translate3d(${curr_x}px, ${curr_y}px, 0)`;
                }
        }, false);

/* ---------------------------TEXTURE-LOAD----------------------------------- */

const texture = new Image(64, 128);
texture.src = 'data:image/png;base64,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'

//TODO: there is possibly a need for a texture creator constructor, however
// there most likely will be only one texture atlas with fonts and
// graphics / tiles which should be a power of 2 square

texture.addEventListener('load',
        () => {
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }, false);

/* ---------------------------WEBGL-DATA------------------------------------- */

const canvas = document.getElementById('webgl-canvas');
let gl = canvas.getContext('webgl2');

const v_source = `#version 300 es
layout (location = 0) in vec3 pos;
layout (location = 1) in vec2 a_tex;

out vec2 v_tex;

void main()
{
    v_tex = a_tex;
    gl_Position = vec4(pos.x, pos.y, pos.z, 1.0);
}
`;


const f_source = `#version 300 es
precision highp float;

uniform sampler2D u_image;

in vec2 v_tex;
out vec4 FragColor;

void main()
{
    FragColor = texture(u_image, v_tex);
}
`;

const texture_coordinates = new Float32Array([
        1.0, 1.0,  // top right
        1.0, 0.0,  // bottom right
        0.0, 0.0,  // bottom left
        0.0, 1.0,  // top left
]);

const triangle_vertices = new Float32Array([
        0.5, 0.5, 0.0,  // top right
        0.5, -0.5, 0.0,  // bottom right
        -0.5, -0.5, 0.0,  // bottom left
        -0.5, 0.5, 0.0   // top left
]);

const triangle_indices = new Uint16Array([
        0, 1, 3,  // first Triangle
        1, 2, 3   // second Triangle
]);

/* ----------------------------WEBGL-INIT------------------------------------ */

window.addEventListener('load', () => {
        /* TODO: move shader initialization to a separate function / class and
            then handle potential shader source errors
            (print GLSL error message and then compile basic shader instead)
         */
        const v_shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(v_shader, v_source);
        gl.compileShader(v_shader);
        if (!gl.getShaderParameter(v_shader, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(v_shader));
        }

        const f_shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(f_shader, f_source);
        gl.compileShader(f_shader);
        if (!gl.getShaderParameter(v_shader, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(f_shader));
        }

        const s_program = gl.createProgram();
        gl.attachShader(s_program, v_shader);
        gl.attachShader(s_program, f_shader);
        gl.linkProgram(s_program);
        if (!gl.getProgramParameter(s_program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(s_program));
        }
        gl.detachShader(s_program, v_shader);
        gl.deleteShader(v_shader);
        gl.detachShader(s_program, f_shader);
        gl.deleteShader(f_shader);


        const triangle_vao = gl.createVertexArray();
        gl.bindVertexArray(triangle_vao);

        const triangle_vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangle_vbo);
        gl.bufferData(gl.ARRAY_BUFFER, triangle_vertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

        const texture_vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texture_vbo);
        gl.bufferData(gl.ARRAY_BUFFER, texture_coordinates, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

        const texture_atlas = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture_atlas);

        //TODO: create separate texture sampler if possible
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, texture);


        const triangle_ebo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangle_indices, gl.STATIC_DRAW);


        gl.bindVertexArray(null);


        /* ----------------------------MAIN-LOOP------------------------------------- */

        //TODO: Handle window resizing in a separate call
        // if (canvas.width !== canvas.clientWidth ||
        //         canvas.height !== canvas.clientHeight)
        //         [canvas.width, canvas.height] =
        //                 [canvas.clientWidth, canvas.clientHeight];
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(s_program);
        gl.bindVertexArray(triangle_vao);

        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
});
