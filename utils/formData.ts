export const compileFormData = (body: any) => {
    const formData = new FormData();
    Object.keys(body).map((key) => {
         switch (key) {
            case 'images':
                if (body[key]?.length) {
                    body[key].map((el: any) =>
               {

                        formData.append(`${key}`, el);
               }
                    );
                }
                return false;
         
            default:
                formData.append(key, body[key]);
                return false;
        }
    });
    return formData;
};