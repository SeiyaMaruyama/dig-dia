import { Modal } from "./Modal";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="日記を削除">
      <p className="mb-4">本当にこの日記を削除しますか？</p>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          キャンセル
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          削除
        </Button>
      </div>
    </Modal>
  );
}
