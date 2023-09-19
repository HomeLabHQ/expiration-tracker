from enum import Enum


class ItemCategory(Enum):
    GOODS = "Goods"
    MEDICATIONS = "Medications"


class ItemStatus(Enum):
    STOCK = "Stock"
    OPENED = "Opened"
    DISPOSED = "Disposed"
    USED = "Used"
