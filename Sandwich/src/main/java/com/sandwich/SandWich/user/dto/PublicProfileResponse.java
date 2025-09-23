package com.sandwich.SandWich.user.dto;

import java.util.List;

public record PublicProfileResponse(
        Long id,
        String nickname,
        String username,
        String email,
        String position,
        List<String> interests
) {}