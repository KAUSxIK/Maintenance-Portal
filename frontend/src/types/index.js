// User class
class User {
  constructor(id, name, email, apartment, phone, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.apartment = apartment;
    this.phone = phone;
    this.role = role; // 'resident' or 'admin'
  }
}

// Booking class
class Booking {
  constructor(id, userId, userName, apartment, facility, date, timeSlot, status, createdAt) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    this.apartment = apartment;
    this.facility = facility; // 'washing-machine' or 'pantry'
    this.date = date;
    this.timeSlot = timeSlot;
    this.status = status; // 'confirmed' or 'cancelled'
    this.createdAt = createdAt;
  }
}

// Complaint class
class Complaint {
  constructor(
    id,
    userId,
    userName,
    apartment,
    category,
    title,
    description,
    priority,
    status,
    createdAt,
    images = [],
    resolvedAt = null,
    adminNotes = ''
  ) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    this.apartment = apartment;
    this.category = category; // 'plumbing' | 'electrical' | 'cleaning' | 'security' | 'other'
    this.title = title;
    this.description = description;
    this.priority = priority; // 'low' | 'medium' | 'high' | 'urgent'
    this.status = status; // 'pending' | 'in-progress' | 'resolved' | 'closed'
    this.images = images;
    this.createdAt = createdAt;
    this.resolvedAt = resolvedAt;
    this.adminNotes = adminNotes;
  }
}

// TimeSlot class
class TimeSlot {
  constructor(id, time, available, bookedBy = null) {
    this.id = id;
    this.time = time;
    this.available = available;
    this.bookedBy = bookedBy;
  }
}
