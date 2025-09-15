package com.sandwich.SandWich.user.repository;
import com.sandwich.SandWich.user.domain.User;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    // 일반 유저 조회 (자동으로 is_deleted = false 조건 적용됨)
    Optional<User> findByEmailAndIsDeletedFalse(String email);
    Optional<User> findByEmailAndProviderAndIsDeletedFalse(String email, String provider);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    @Query("""
        SELECT DISTINCT u
        FROM User u
        LEFT JOIN FETCH u.profile
        LEFT JOIN FETCH u.userPosition up
        LEFT JOIN FETCH up.position
        LEFT JOIN FETCH u.interests ui
        LEFT JOIN FETCH ui.interest
        WHERE u.email = :email
          AND u.isDeleted = false
        """)
    Optional<User> findByEmailWithDetails(@Param("email") String email);


    @Query("SELECT u FROM User u WHERE u.id = :id AND u.isDeleted = false")
    Optional<User> findByIdIfNotDeleted(@Param("id") Long id);



    /** 배우 정보 경량 뷰 (닉네임/이메일/프로필URL) */
    interface ActorView {
        Long getId();
        String getNickname();       // Profile.nickname 우선 (없으면 username 쪽에서 채우고 싶다면 COALESCE 처리)
        String getEmail();          // User.email
        String getProfileImage();   // Profile.profileImage
    }

    /** 배치 조회: actor 필드 렌더링 용 */
    @Query("""
      select u.id as id,
             COALESCE(p.nickname, u.username) as nickname,
             u.email as email,
             p.profileImage as profileImage
      from User u
      left join u.profile p
      where u.id in :ids and u.isDeleted = false
    """)
    List<ActorView> findActorViewsByIds(@Param("ids") Set<Long> ids);
}