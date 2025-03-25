#version 330 core
layout(location=0) in vec3 aPos;
uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;
uniform float time;

struct Wave {
    float speed;
    float amplitude;
    float steepness;
    float wavelength;
    vec2 direction;
};
uniform Wave waves[3];

out vec3 pos;

void main() {
    vec3 p = aPos;
    for(int i = 0; i < 3; i++) {
        float k = 2 * 3.14159 / waves[i].wavelength;
        float f = k * (dot(waves[i].direction, p.xz) - waves[i].speed * time); // Fixed missing )
        float a = waves[i].steepness * waves[i].amplitude;
        
        p.x += waves[i].direction.x * (a * cos(f));
        p.z += waves[i].direction.y * (a * cos(f));
        p.y += waves[i].amplitude * sin(f);
    }
    
    pos = p;
    gl_Position = proj * view * model * vec4(p, 1.0);
}