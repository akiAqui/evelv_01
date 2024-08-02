function NORM(omega) {
    return min(omega, 360 - omega);
}

function metropolisHue(currentHue, candidateHue, currentTheta, t, k) {
    const dEh = NORM(abs(candidateHue - currentTheta)) - NORM(abs(currentHue - currentTheta));

    if (DEBUG_MODE && k === DEBUG_POINT_INDEX && t >= DEBUG_START_TIME && t <= DEBUG_END_TIME) {
        console.log(`Hue perturbation: H(${k},candidate) = ${candidateHue}, θ(${k},${t}) = ${currentTheta}, H(${k},${t}) = ${currentHue}`);
        console.log(`|H(${k},candidate) - θ(${k},${t})| = ${abs(candidateHue - currentTheta)}, NORM = ${NORM(abs(candidateHue - currentTheta))}`);
        console.log(`|H(${k},${t}) - θ(${k},${t})| = ${abs(currentHue - currentTheta)}, NORM = ${NORM(abs(currentHue - currentTheta))}`);
        console.log(`dEh(${k},${t}) = ${dEh}`);
    }

    if (dEh < 0) {
        return candidateHue;
    } else {
        const P = exp(-dEh / H);
        const R = random(0, 1);
        if (DEBUG_MODE && k === DEBUG_POINT_INDEX && t >= DEBUG_START_TIME && t <= DEBUG_END_TIME) {
            console.log(`P(${k},${t}) = ${P}, R(${k},${t}) = ${R}`);
        }
        return R < P ? candidateHue : currentHue;
    }
}

function metropolisLightness(currentLightness, candidateLightness, currentR, t, k) {
    const dEl = abs(candidateLightness - currentR) - abs(currentLightness - currentR);

    if (DEBUG_MODE && k === DEBUG_POINT_INDEX && t >= DEBUG_START_TIME && t <= DEBUG_END_TIME) {
        console.log(`Lightness perturbation: L(${k},candidate) = ${candidateLightness}, r(${k},${t}) = ${currentR}, L(${k},${t}) = ${currentLightness}`);
        console.log(`|L(${k},candidate) - r(${k},${t})| = ${abs(candidateLightness - currentR)}`);
        console.log(`|L(${k},${t}) - r(${k},${t})| = ${abs(currentLightness - currentR)}`);
        console.log(`dEl(${k},${t}) = ${dEl}`);
    }

    if (dEl < 0) {
        return candidateLightness;
    } else {
        const P = exp(-dEl / L);
        const R = random(0, 1);
        if (DEBUG_MODE && k === DEBUG_POINT_INDEX && t >= DEBUG_START_TIME && t <= DEBUG_END_TIME) {
            console.log(`P(${k},${t}) = ${P}, R(${k},${t}) = ${R}`);
        }
        return R < P ? candidateLightness : currentLightness;
    }
}
