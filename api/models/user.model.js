import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
    },
    contact: {
        type: Number,
        required:false,
        unique: true,
    },
    gender: {
        type: String,
        required:false,
    },    
    username: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required:true,
    },
    avatar: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAMFBMVEXk5ueutLfp6+y2vL6rsbWor7KyuLu6v8LT1tjY29zb3t/Gysze4eLDx8rP09TJzc8ZZtZUAAAD90lEQVR4nO2c246jMAxAickVCPn/v90And22gtaJwWa0OS8jjebhyIlNLs50XaPRaDQajUaj0Wg0Go1G10E3DWGex5hJPgwdgLTSHtD56Kw2Ri/kH9aNvrudKgSnlFYvaK1snO6lGnrzZvkja1yQlvtLjqbe19zi6u4S1fhBc1VVSVqxW8JpP2sumF48qDC/p9B+UK30TE0Iy011Fo1pNFhRZQRNYcR7LjEVE02Y6fkUUy+jCXOZZzadZExLPZXuRTz7YlGlo4DnWO65TFP21J8qNBe4RcHVBHQZfGbToaSCPmMHVk9wlZ5Kj6yiodYzw1pMY90MXTCJcZZOlhBRzsT3tam0hpQvnWpr0wO+CgWUgOYKxeXZBaIo17YECteh77DtSuqr/UOUbffcE0W5FnsDqYpmuNbPgSpqmb6inujJ9bmHmeqpeb5N5bvPd5g+oieI8lT8/0iUaY7Ss14zlSfKPmSDS5Rc8Hk8iRuRPPKOSRR+y6Lk1yzzyPWJ7UB3Im5F2LahQItoz7cLrTob/YHzImegiBo2za7qWPxvQPlGPkPIe6al04P6jxPbZ2kDqs8d+Tb1D9PaUsp91QSpzlTg/qYq8bXlv2KuWz4L3IaW3YE/ELkJB0QzySvayfQWlBZTiQm6UTZNNdfZ2J5p0TTlvVx8AfAxzfEUbdPBtGetnv0g3aJlMcNveJci+6SvvWTact5/HgLhS1CNEx/2H+ZPbZlWqN1pD4DU704ArRz/cukjS4ezfevK1caO4X5dzpkhOW3WWaC1US4JVvgvAEA3BO99mG7a2/4AXpHW2WGxmsKcYnSuzzjn4jjnwN5GdxX0KS4vBcxrMq2/yVN1nMMwyeYUwOCj65X5VPCXVw7WxSSX/xCiXZ8vYMh/ZR3/RiSPt4/q4DHDMcYsJYsvsAA+Hj25+BbYPAsS08IUumSR473vqhTLS5cwfkwdZFydv9YVJod6yPBdVfcXLlagO0lzVVX2IlWYxroEOsS4cIEqzITj8AO0iqcXq4l4W3ekevb4f9pr0DDuzPOTgkc2xZwXVBiKj+0KVU/aTJPab1GcMvy060QkuidnP7jL47lCPkIj9LEXmpJOU4hd1yWQjiUZPRfqM4ojj56oPTqnt7YVUntpQmxirzGtekpQ+wSMZFqzT2UrTM9UTFPuCbpRMU0lNFX5C+f6DgcqZZ2QBRddZ1OY+byfpBeKGuJIDVhE9IgPKfM3/o2CTjNiNyNVFL0zoT6sooLvP6A2W1PBHqDI1aYN7KthQP9Lj6tEsZtS0ZxfwZXSidi9Tgf57zcGaU9sR+T1JyNfwTV2VPYxngmukoqt8P5hUKKj7aXBLUrhBqBEG41b8QcZDDNkChgRlgAAAABJRU5ErkJggg==",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;