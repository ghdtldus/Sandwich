import React, { useEffect, useState } from "react";

const OPTIONS = [
	"자료구조 & 알고리즘",
	"운영체제",
	"테스트 코드 작성 (TDD)",
	"디자인 패턴",
	"소프트웨어 아키텍처",
	"네트워크",
	"클린 코드",
	"CI / CD",
	"API 설계",
	"운영환경",
	"DB모델링/정규화",
] as const;

type Option = typeof OPTIONS[number];

interface Props {
	open: boolean;
	initial: Option[];
	onClose: () => void;
	onConfirm: (values: Option[]) => void;
}

const InterestFieldModal: React.FC<Props> = ({ open, initial, onClose, onConfirm }) => {
	const [selected, setSelected] = useState<Option[]>([]);

	useEffect(() => {
		if (open) setSelected(initial.slice(0, 3));
	}, [open, initial]);

	const toggle = (opt: Option) => {
		setSelected((prev) => {
			const exists = prev.includes(opt);
			if (exists) return prev.filter((v) => v !== opt);
			if (prev.length >= 3) return prev; // 최대 3개
			return [...prev, opt];
		});
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-xl w-[700px] border border-[#E5E7EB] shadow-lg font-gmarket relative">
				{/* 헤더 */}
				<div className="px-6 py-4 border-b flex items-start justify-between">
					<div>
						<div className="text-[18px] font-medium text-black">관심 분야 설정</div>
						<div className="text-[13px] text-[#6B7280] mt-1">관심 분야를 최대 3개까지 선택해주세요.</div>
					</div>
					<button
						type="button"
						aria-label="닫기"
						onClick={onClose}
						className="text-[#9CA3AF] hover:text-[#6B7280] text-[40px] leading-none w-10 h-10 flex items-center justify-center"
					>
						×
					</button>
				</div>

				{/* 옵션 영역 */}
				<div className="px-6 py-4">
					<div className="flex flex-wrap gap-3">
						{OPTIONS.map((opt) => {
							const active = selected.includes(opt);
							return (
								<button
									key={opt}
									type="button"
									aria-pressed={active}
									onClick={() => toggle(opt)}
									className={`h-11 rounded-[10px] border inline-flex items-center px-4 text-[14px] justify-start whitespace-nowrap ${
										active
											? "bg-white border-[#22C55E] text-black"
											: "bg-white border-[#E5E7EB] text-black"
									}`}
								>
									<span
										className={`inline-flex items-center justify-center w-4 h-4 rounded-full mr-2 border ${
											active ? "bg-[#1DB8B8] border-[#1DB8B8] text-white" : "bg-white border-[#D1D5DB] text-transparent"
										}`}
									>
										✓
									</span>
									<span>{opt}</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* 풋터 버튼 */}
				<div className="px-6 py-3 border-t flex items-center justify-end gap-2">
					<button
						type="button"
						onClick={onClose}
						className="px-4 h-9 rounded-full bg-white border border-[#E5E7EB] text-[12px] text-black"
					>
						취소
					</button>
					<button
						type="button"
						onClick={() => onConfirm(selected)}
						className="px-5 h-9 rounded-full bg-[#1DB8B8] text-white text-[12px]"
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default InterestFieldModal; 