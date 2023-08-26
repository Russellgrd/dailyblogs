
import * as yup from 'yup';

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const blogSchema = yup.object().shape({
    blogTitle: yup.string().min(5).required(),
    blogBody: yup.string().min(20).required(),
    file: yup.array()
        .nullable()
        .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', (files) => {
            let valid = true
            if (files) {
                files.map(file => {
                    const size = file.size / 1024 / 1024
                    if (size > 10) {
                        valid = false
                    }
                })
            }
            return valid
        })
        .test(
            'is-big-file',
            'VALIDATION_FIELD_FILE_WRONG_TYPE',
            (files) => {
                let valid = true
                if (files) {
                    files.map(file => {
                        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
                            valid = false
                        }
                    })
                }
                return valid
            }
        )
    // file: yup.mixed<File>().test("isFile", "This is not a file", (file) => {
    //     console.log(typeof file);
    // })
})

export function checkIfFilesAreTooBig(files?: [File]): boolean {
    let valid = true
    if (files) {
        files.map(file => {
            const size = file.size / 1024 / 1024
            if (size > 10) {
                valid = false
            }
        })
    }
    return valid
}

export function checkIfFilesAreCorrectType(files?: [File]): boolean {
    let valid = true
    if (files) {
        files.map(file => {
            if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
                valid = false
            }
        })
    }
    return valid
}
// yup
//     .mixed<FileList>() // Pass in the type of `fileUpload`
//     .test(
//         "fileSize",
//         "Only documents up to 2MB are permitted.",
//         files =>
//             !files || // Check if `files` is defined
//             files.length === 0 || // Check if `files` is not an empty list
//             Array.from(files).every(file => file.size <= 2_000_000)
//     )