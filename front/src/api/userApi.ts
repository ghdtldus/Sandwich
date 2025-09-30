import api from "./axiosInstance";

export type PositionDto = { id: number; name: string };
export type InterestDto = { id: number; name: string };
export type UserProfileResponse = {
	username: string;
	email: string;
	nickname: string;
	bio?: string | null;
	skills?: string | null;
	github?: string | null;
	linkedin?: string | null;
	profileImage?: string | null;
	position?: PositionDto | null;
	interests: InterestDto[];
	followerCount: number;
	followingCount: number;
	profileName?: string | null; // one-line profile
};

export type UserProfileRequest = {
	nickname: string;
	positionId: number;
	interestIds: number[];
	bio?: string | null;
	skills?: string | null;
	github?: string | null;
	linkedin?: string | null;
	profileImageUrl?: string | null;
};

// 대표 커리어(경력/학력/수상/프로젝트) 요약 응답
export type RepresentativeCareer = {
	type: "CAREER" | "EDUCATION" | "AWARD" | "PROJECT";
	title: string;
	subtitle: string;
	description?: string | null;
};

export const UserApi = {
	async checkNickname(nickname: string): Promise<boolean> {
		const res = await api.get<boolean>("/users/check-nickname", { params: { value: nickname } });
		return res.data;
	},
	async updateNickname(nickname: string): Promise<void> {
		await api.patch("/users/nickname", { nickname });
	},
	async checkUsername(username: string): Promise<{ exists: boolean; message?: string }> {
		const res = await api.get("/auth/username/check", { params: { username } });
		return res.data as any;
	},
	async updateUsername(username: string): Promise<void> {
		await api.patch("/users/username", { username });
	},
	async getMe(): Promise<UserProfileResponse> {
		const res = await api.get<UserProfileResponse>("/users/me");
		return res.data;
	},
	// 대표 커리어 목록 조회
	async getRepresentativeCareers(): Promise<RepresentativeCareer[]> {
		const res = await api.get<RepresentativeCareer[]>("/users/me/representative-careers");
		return res.data;
	},
	async updateProfile(payload: UserProfileRequest): Promise<void> {
		await api.put("/users/profile", payload);
	},
	async uploadImage(file: File): Promise<string> {
		const form = new FormData();
		form.append("file", file);
		const res = await api.post<{ url: string }>("/upload/image", form, { headers: { "Content-Type": "multipart/form-data" } });
		return (res as any).data.url;
	},
	async getPosition(): Promise<PositionDto> {
		const res = await api.get<PositionDto>("/users/position");
		return res.data;
	},
};
