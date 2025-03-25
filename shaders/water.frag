#version 330 core
in vec3 pos;
uniform float time;
uniform float waterDepth;       
uniform vec3 shallowColor;     
uniform vec3 deepColor;        
out vec4 FragColor;

vec3 getSky(vec2 uv) {
    vec3 sky = mix(vec3(0.4,0.6,1.0), vec3(0.7,0.9,1.0), uv.y);
    vec2 sunPos = vec2(0.5,0.7);
    float sun = smoothstep(0.05,0.03,distance(uv,sunPos));
    sun += smoothstep(0.1,0.0,distance(uv,sunPos))*0.5;
    return sky + sun*vec3(1.0,0.9,0.5);
}

void main() {
    vec2 uv = pos.xz*0.5+0.5;
    float distort = sin(time*2.0+uv.x*10.0)*0.01 + sin(time*1.5+uv.y*8.0)*0.01;
    vec3 refl = getSky(vec2(uv.x,1.0-uv.y+distort));
    
    float depthFactor = clamp((-pos.y) / waterDepth, 0.0, 1.0);
    vec3 waterColor = mix(shallowColor, deepColor, depthFactor);
    
    float fresnel = pow(1.0 - abs(dot(vec3(0,1,0), normalize(pos))), 2.0);
    vec3 water = mix(waterColor, refl, fresnel);
    
    FragColor = vec4(water, 0.7 + sin(time)*0.1);
}